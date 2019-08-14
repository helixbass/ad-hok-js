import {useState, useMemo} from 'react'
import {isFunction} from 'lodash'
import {mapValues, map} from 'lodash/fp'

const mapWithKey = map.convert({cap: false})

const addStateHandlers = (initial, handlers, dependencyNames) => props => {
  const state = {}
  const setters = {}
  if (isFunction(initial)) initial = initial(props)

  mapWithKey((val, key) => {
    const [stateVal, setter] = useState(val)
    state[key] = stateVal
    setters[key] = setter
  })(initial)

  const createHandlerProps = () =>
    mapValues(handler => (...args) => {
      const updatedState = handler(state, props)(...args)
      mapWithKey((updatedValue, stateKey) => {
        setters[stateKey](updatedValue)
      })(updatedState)
    })(handlers)

  const handlerProps =
    dependencyNames != null
      ? useMemo(createHandlerProps, [
          ...mapWithKey((val, key) => state[key])(initial),
          ...dependencyNames.map(dependencyName => props[dependencyName]),
        ])
      : createHandlerProps()

  return {
    ...props,
    ...state,
    ...handlerProps,
  }
}

export default addStateHandlers
