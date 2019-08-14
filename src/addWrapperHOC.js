import React from 'react'

const markerPropertyName = '__ad-hok-addWrapperHOC'

export const isAddWrapperHOC = (func) =>
  func[markerPropertyName]

export default (hoc, {displayName = 'addWrapperHOC()'} = {}) => {
  const ret = (Component) => {
    const WrappedComponent = hoc(Component)
    WrappedComponent.displayName = displayName

    return (props) => <WrappedComponent {...props} />
  }
  ret[markerPropertyName] = true
  return ret
}
