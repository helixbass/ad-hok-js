import {useRef} from 'react'
import {isFunction, get} from './helpers'
import usePrevious from './usePrevious'
import useMemoized from './useMemoized'

const useComputedFromDependencies = ({
  compute,
  dependencies,
  additionalResolvedDependencies = [],
  props,
}) =>
  dependencies != null
    ? isFunction(dependencies)
      ? (() => {
          const prevProps = usePrevious(props)
          const computedValueRef = useRef()
          const changed = prevProps == null || dependencies(prevProps, props)
          const value = changed ? compute() : computedValueRef.current
          computedValueRef.current = value
          return value
        })()
      : useMemoized(compute, [
          ...dependencies.map(dependencyName => get(dependencyName)(props)),
          ...additionalResolvedDependencies,
        ])
    : compute()

export default useComputedFromDependencies
