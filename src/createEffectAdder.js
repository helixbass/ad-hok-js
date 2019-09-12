import {isArray, get, shallowEqualArray} from './util/helpers'
import usePrevious from './util/usePrevious'

const isSimpleDependenciesArray = dependencies => {
  if (!isArray(dependencies)) return false
  for (let i = 0; i < dependencies.length; i++) {
    const element = dependencies[i]
    if (element.indexOf('.') > -1) return false
  }
  return true
}

const createEffectAdder = effectHook => (callback, dependencies) => {
  const isDependenciesNullish = dependencies == null
  const isDependenciesSimpleArray =
    !isDependenciesNullish && isSimpleDependenciesArray(dependencies)
  const isDependenciesArray =
    !isDependenciesNullish &&
    (isDependenciesSimpleArray || isArray(dependencies))

  return props => {
    isDependenciesNullish
      ? effectHook(callback(props))
      : isDependenciesSimpleArray
      ? // TODO: throw nice error if changeProps isn't array/iterable or any changeProp isn't a string?
        effectHook(
          callback(props),
          dependencies.map(dependencyPropName => props[dependencyPropName])
        )
      : (() => {
          const prevProps = usePrevious(props)
          if (isDependenciesArray) {
            effectHook(() => {
              if (
                prevProps != null &&
                shallowEqualArray(
                  dependencies.map(dependencyPropName =>
                    get(dependencyPropName)(prevProps)
                  ),
                  dependencies.map(dependencyPropName =>
                    get(dependencyPropName)(props)
                  )
                )
              )
                return

              callback(props)()
            })
          } else {
            effectHook(() => {
              if (prevProps != null && !dependencies(prevProps, props)) return

              callback(props)()
            })
          }
        })()

    return props
  }
}

export default createEffectAdder
