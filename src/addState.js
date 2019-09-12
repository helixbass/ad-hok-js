import {useState} from 'react'
import {isFunction} from './util/helpers'

const addState = (name, setterName, initial) => props => {
  const [state, setter] = useState(
    isFunction(initial) ? initial(props) : initial
  )
  return {...props, [name]: state, [setterName]: setter}
}

export default addState
