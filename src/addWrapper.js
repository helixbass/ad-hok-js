import React from 'react'

const markerPropertyName = '__ad-hok-addWrapper'

export const isAddWrapper = func => func[markerPropertyName]

export default callback => {
  const ret = Component => props =>
    callback({
      props,
      render: additionalProps => <Component {...props} {...additionalProps} />,
    })
  ret[markerPropertyName] = true
  return ret
}
