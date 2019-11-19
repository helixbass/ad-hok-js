import React from 'react'
import flowMax from './flowMax'
import {markerPropertyName} from './branch-avoid-circular-dependency'

export default (test, consequent, alternate = props => props) => {
  const ret = Component => {
    let ConsequentAsComponent
    const createConsequent = () => {
      const Consequent = flowMax(consequent, Component)
      if (Consequent.displayName == null || Consequent.displayName === 'ret')
        Consequent.displayName = `branch(${
          Component.displayName != null ? Component.displayName : ''
        })`
      return Consequent
    }
    let AlternateAsComponent
    const createAlternate = () => {
      const Alternate = flowMax(alternate, Component)
      if (Alternate.displayName == null || Alternate.displayName === 'ret')
        Alternate.displayName = `branch(${
          Component.displayName != null ? Component.displayName : ''
        })`
      return Alternate
    }
    return props => {
      if (test(props)) {
        if (ConsequentAsComponent == null) {
          ConsequentAsComponent = createConsequent()
        }
        return <ConsequentAsComponent {...props} />
      } else {
        if (AlternateAsComponent == null) {
          AlternateAsComponent = createAlternate()
        }
        return <AlternateAsComponent {...props} />
      }
    }
  }
  ret[markerPropertyName] = true
  return ret
}
