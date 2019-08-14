import React from 'react'

const markerPropertyName = '__ad-hok-addPropTypes'

export const isAddPropTypes = func => func[markerPropertyName]

export default propTypes => {
  const ret = Component => {
    Component.propTypes = propTypes
    return props => <Component {...props} />
  }
  ret[markerPropertyName] = true
  return ret
}
