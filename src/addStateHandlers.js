import {useState, useRef} from 'react'
import {isFunction, isArray, mapValues, mapWithKey} from './util/helpers'
import usePrevious from './util/usePrevious'
import useComputedFromDependencies from './util/useComputedFromDependencies'

const addStateHandlers = (initial, handlers, dependencies) => props => {
  const state = {}
  const setters = {}
  const computedInitial = useRef()
  const useInitial = (() => {
    if (!isFunction(initial)) return initial
    if (computedInitial.current == null) {
      computedInitial.current = initial(props)
    }
    return computedInitial.current
  })()

  mapWithKey((val, key) => {
    const [stateVal, setter] = useState(val)
    state[key] = stateVal
    setters[key] = setter
  })(useInitial)

  const createHandlerProps = () =>
    mapValues(handler => {
      const curriedHandler = handler(state, props)
      return (...args) => {
        const updatedState = curriedHandler(...args)
        mapWithKey((updatedValue, stateKey) => {
          setters[stateKey](updatedValue)
        })(updatedState)
      }
    })(handlers)

  const handlerProps = useComputedFromDependencies({
    compute: createHandlerProps,
    dependencies:
      dependencies != null
        ? isFunction(dependencies)
          ? (() => {
              const prevState = usePrevious(state)
              const hasStateChanged = (() => {
                if (prevState == null) return true
                for (let key in useInitial) {
                  const currentStateVal = state[key]
                  const prevStateVal = prevState[key]
                  if (currentStateVal !== prevStateVal) return true
                }
                return false
              })()
              return (prevProps, _props) => {
                if (hasStateChanged) return true
                return dependencies(prevProps, _props)
              }
            })()
          : dependencies
        : undefined,
    additionalResolvedDependencies: isArray(dependencies)
      ? mapWithKey((_, key) => state[key])(useInitial)
      : undefined,
    props,
  })

  return {
    ...props,
    ...state,
    ...handlerProps,
  }
}

export default addStateHandlers
