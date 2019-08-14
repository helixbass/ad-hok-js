import {isAddPropTypes} from './addPropTypes'
import {isRenderNothing} from './renderNothing'
import {isReturns} from './returns'
import {isAddWrapper} from './addWrapper'
import {isAddWrapperHOC} from './addWrapperHOC'
import {isBranch} from './branch-avoid-circular-dependency'
import {isAddDisplayName} from './addDisplayName'

const getArgumentsPropertyName = '__ad-hok-flowMax-getArguments'

const isFlowMax = (func) =>
  func[getArgumentsPropertyName]

const flowMax = (...funcs) => {
  const getPrecedingFuncs = (index) =>
    index === 0 ?
      []
    :
      funcs.slice(0,index)
  const getFollowingFuncs = (index) =>
    funcs.slice(index + 1)
  const flowLength = funcs && funcs.length || 0
  let displayName = null
  const wrapExistingDisplayName = (wrapperStr) =>
    `${wrapperStr}(`{displayName != null ? displayName : ''})`
  if (flowLength) {
  for (let funcIndex = 0; funcIndex < funcs.length; funcIndex++) {
    const func = funcs[funcIndex]
      if (getNestedFlowMaxArguments = isFlowMax(func))
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
          newFollowingFlowMax.displayName =
              isAddPropTypes(func) ?
                wrapExistingDisplayName('addPropTypes')
                :
              isAddWrapper(func) ? wrapExistingDisplayName('addWrapper')
              : isAddWrapperHOC(func) ?
                wrapExistingDisplayName('addWrapperHOC') : undefined
        newFlowMax = flowMax(
          ...getPrecedingFuncs(funcIndex),
          func(newFollowingFlowMax)
        )
        // Expose original arguments if we're nested
        newFlowMax[getArgumentsPropertyName] = () => funcs
        return newFlowMax
      }
      if (addedDisplayName = isAddDisplayName(func))
        displayName = addedDisplayName[0]
  }
  }
  const ret = (...args) => {
    if (!(funcs && funcs.length))
      return args[0]
    const index = 0
    const props = null
    while (index < flowLength) {
     let func = funcs[index]
      currentArgs =
        index === 0 ?
          args
        :
          [props]
      props = func(...currentArgs)
      if (isRenderNothing(props))
        return null
      if (returnsVal = isReturns(props))
        return returnsVal[0]
      index++
    }
    props
  }
  if (displayName != null)
    ret.displayName = displayName
  ret[getArgumentsPropertyName] = () => funcs
  return ret
}

export default flowMax
