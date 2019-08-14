import {isFunction} from 'lodash'
import {useMemo} from 'react'

const addProps = (updater, dependencyNames) => (props) => {
  const getAddedProps = () =>
    isFunction(updater) ? updater(props) : updater

  const addedProps = dependencyNames ?
    useMemo(
      getAddedProps,
      dependencyNames.map(dependencyName => props[dependencyName])
    )
  :
    getAddedProps()

  return {
    ...props
    ...addedProps
  }
}

export default addProps
