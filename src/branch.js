import React from 'react'
import flowMax from './flowMax'
import {markerPropertyName} from './branch-avoid-circular-dependency'

export default (test, consequent, alternate = (props) => props) => {
  const ret = (Component) => {
    const ConsequentAsComponent = flowMax(consequent, Component)
    if (
      ConsequentAsComponent.displayName == null ||
      ConsequentAsComponent.displayName === 'ret'
    )
      ConsequentAsComponent.displayName = `branch(${Component.displayName != null ? Component.displayName : ''})`
    const AlternateAsComponent = flowMax(alternate, Component)
    if (
      AlternateAsComponent.displayName == null ||
      AlternateAsComponent.displayName === 'ret'
    )
      AlternateAsComponent.displayName = `branch(${Component.displayName != null ? Component.displayName : ''})`
    return (props) =>
      test(props) ?
        <ConsequentAsComponent {...props} />
      :
        <AlternateAsComponent {...props} />
  }
  ret[markerPropertyName] = true
  return ret
}
