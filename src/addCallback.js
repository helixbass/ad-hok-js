import {useCallback} from 'react'

const addCallback = (name, callback, dependencies) => props => {
  const curriedCallback = useCallback(callback(props), dependencies)
  return {...props, [name]: curriedCallback}
}

export default addCallback
