import {useRef} from 'react'

const addRef = (name, initialValue) =>
  (props) => {
    const ref = useRef(initialValue)
    return {...props, [name]: ref}
  }

export default addRef
