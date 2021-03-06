import {useContext} from 'react'

const addContext = (context, name) => props => {
  const value = useContext(context)
  return {...props, [name]: value}
}

export default addContext
