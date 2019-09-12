import {isFunction} from './util/helpers'
import useComputedFromDependencies from './util/useComputedFromDependencies'

const addProps = (updater, dependencies) => props => {
  const getAddedProps = () => (isFunction(updater) ? updater(props) : updater)

  const addedProps = useComputedFromDependencies({
    compute: getAddedProps,
    dependencies,
    props,
  })

  return {
    ...props,
    ...addedProps,
  }
}

export default addProps
