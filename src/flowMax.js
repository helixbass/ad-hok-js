import {isAddPropTypes} from './addPropTypes'
import {isRenderNothing} from './renderNothing'
import {isReturns} from './returns'
import {isAddWrapper} from './addWrapper'
import {isAddWrapperHOC} from './addWrapperHOC'
import {isBranch} from './branch-avoid-circular-dependency'
import {isAddDisplayName} from './addDisplayName'

const getArgumentsPropertyName = '__ad-hok-flowMax-getArguments'

const isFlowMax = func => func[getArgumentsPropertyName]

const flowMax = (...funcs) => {
  const getPrecedingFuncs = index => (index === 0 ? [] : funcs.slice(0, index))
  const getFollowingFuncs = index => funcs.slice(index + 1)
  const flowLength = (funcs && funcs.length) || 0
  let displayName = null
  const wrapExistingDisplayName = wrapperStr =>
    `${wrapperStr}(${displayName != null ? displayName : ''})`
  if (flowLength) {
    for (let funcIndex = 0; funcIndex < funcs.length; funcIndex++) {
      const func = funcs[funcIndex]
      const getNestedFlowMaxArguments = isFlowMax(func)
      if (getNestedFlowMaxArguments)
        return flowMax(
          ...getPrecedingFuncs(funcIndex),
          ...getNestedFlowMaxArguments(),
          ...getFollowingFuncs(funcIndex)
        )
      if (
        isAddPropTypes(func) ||
        isAddWrapper(func) ||
        isAddWrapperHOC(func) ||
        isBranch(func)
      ) {
        const newFollowingFlowMax = flowMax(...getFollowingFuncs(funcIndex))
        if (
          newFollowingFlowMax.displayName == null ||
          newFollowingFlowMax.displayName === 'ret'
        )
          newFollowingFlowMax.displayName = isAddPropTypes(func)
            ? wrapExistingDisplayName('addPropTypes')
            : isAddWrapper(func)
            ? wrapExistingDisplayName('addWrapper')
            : isAddWrapperHOC(func)
            ? wrapExistingDisplayName('addWrapperHOC')
            : undefined
        const newFlowMax = flowMax(
          ...getPrecedingFuncs(funcIndex),
          func(newFollowingFlowMax)
        )
        // Expose original arguments if we're nested
        newFlowMax[getArgumentsPropertyName] = () => funcs
        return newFlowMax
      }
      const addedDisplayName = isAddDisplayName(func)
      if (addedDisplayName) displayName = addedDisplayName[0]
    }
  }
  const ret = (...args) => {
    if (!(funcs && funcs.length)) return args[0]
    let index = 0
    let props = null
    while (index < flowLength) {
      const func = funcs[index]
      const currentArgs = index === 0 ? args : [props]
      props = func(...currentArgs)
      if (isRenderNothing(props)) return null
      const returnsVal = isReturns(props)
      if (returnsVal) return returnsVal[0]
      index++
    }
    return props
  }
  if (displayName != null) ret.displayName = displayName
  ret[getArgumentsPropertyName] = () => funcs
  return ret
}

export default flowMax
