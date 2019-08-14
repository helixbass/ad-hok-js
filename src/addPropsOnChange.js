import {isArray} from 'lodash'

import addProps from './addProps'
import usePrevious from './util/usePrevious'

const addPropsOnChange = (didChange, getProps) => {
  if (isArray(didChange)) return addProps(getProps, didChange)

  let prevAddedProps = null

  return props => {
    const prevProps = usePrevious(props)
    const changed =
      !prevAddedProps || prevProps == null || didChange(prevProps, props)
    const addedProps = changed ? getProps(props) : prevAddedProps
    prevAddedProps = addedProps

    return {
      ...props,
      ...addedProps,
    }
  }
}

export default addPropsOnChange
