import {mapValues} from 'lodash/fp'
import {useMemo} from 'react'

const addHandlers = (handlers, dependencyNames) => props => {
  const createHandlerProps = () =>
    mapValues(createHandler => (...args) => {
      const handler = createHandler(props)
      return handler(...args)
    })(handlers)

  const handlerProps = dependencyNames
    ? useMemo(
        createHandlerProps,
        dependencyNames.map(dependencyName => props[dependencyName])
      )
    : createHandlerProps()

  return {
    ...props,
    ...handlerProps,
  }
}

export default addHandlers
