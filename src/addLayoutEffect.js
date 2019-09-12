import {useLayoutEffect} from 'react'
import createEffectAdder from './createEffectAdder'

const addLayoutEffect = createEffectAdder(useLayoutEffect)

export default addLayoutEffect
