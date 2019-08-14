const nonce = {}

export const isRenderNothing = val => val === nonce

export default () => () => nonce
