import {useState, useMemo} from 'react'
import {isFunction} from 'lodash'
import {mapValues, map} from 'lodash/fp'

const addStateHandlers = (initial, handlers, dependencyNames) => (props) => {
  const state = {}
  const setters = {}
if (isFunction(initial)) initial = initial(props)

  map((val, key) => {
    const [stateVal, setter] = useState(val)
    state[key] = stateVal
    setters[key] = setter
  })(initial)

  const createHandlerProps = () =>
    mapValues((handler) =>
      (...args) => {
        const updatedState = handler(state, props)(...args)
        map((updatedValue, stateKey) => {
          setters[stateKey](updatedValue)
        })(updatedState)
      }
    )(handlers)

  handlerProps = dependencyNames == null ?
    useMemo(createHandlerProps, [
      ...(state[key] for key of initial)
      ...dependencyNames.map(dependencyName => props[dependencyName])
    ])
  :
    createHandlerProps()

  return {
    ...props,
    ...state,
    ...handlerProps,
  }
}

export default addStateHandlers
