import {useEffect} from 'react'
import createEffectAdder from './createEffectAdder'

const addEffect = createEffectAdder(useEffect)

export default addEffect
