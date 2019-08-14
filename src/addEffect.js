import {useEffect} from 'react'

const addEffect = (callback, changeProps) => props => {
  useEffect(
    callback(props),
    // TODO: throw nice error if changeProps isn't array/iterable or any changeProp isn't a string?
    changeProps != null
      ? changeProps.map(changeProp => props[changeProp])
      : null
  )

  return props
}

export default addEffect
