import {mapValues} from './util/helpers'
import useComputedFromDependencies from './util/useComputedFromDependencies'

const addHandlers = (handlers, dependencies) => props => {
  const createHandlerProps = () =>
    mapValues(createHandler => {
      const handler = createHandler(props)
      return (...args) => handler(...args)
    })(handlers)

  const handlerProps = useComputedFromDependencies({
    compute: createHandlerProps,
    dependencies,
    props,
  })

  return {
    ...props,
    ...handlerProps,
  }
}

export default addHandlers
