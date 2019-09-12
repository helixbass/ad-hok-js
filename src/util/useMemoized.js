import usePrevious from './usePrevious'
import {shallowEqualArray} from './helpers'
import {useRef} from 'react'

const useMemoized = (compute, dependencies) => {
  const memoizedValueRef = useRef()
  const prevDependencies = usePrevious(dependencies)
  if (!shallowEqualArray(prevDependencies, dependencies)) {
    memoizedValueRef.current = compute()
  }
  return memoizedValueRef.current
}

export default useMemoized
