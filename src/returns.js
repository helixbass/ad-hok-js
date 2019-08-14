const key = '__ad-hok-returns'

export const isReturns = val => {
  try {
    if (!(key in val)) return false
    return [val[key]]
  } catch (e) {
    return false
  }
}

export default callback => props => ({
  [key]: callback(props),
})
