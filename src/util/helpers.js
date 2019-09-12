const {toString} = Object.prototype

export const isArray =
  Array.isArray || (obj => toString.call(obj) === '[object Array]')

export const isFunction = obj => toString.call(obj) === '[object Function]'

export const mapValues = callback => obj => {
  const ret = {}
  for (let key in obj) {
    const val = obj[key]
    ret[key] = callback(val)
  }
  return ret
}

export const mapWithKey = callback => obj => {
  const ret = []
  for (let key in obj) {
    const val = obj[key]
    ret.push(callback(val, key))
  }
  return ret
}

export const get = path => {
  const pathParts = path.split('.')
  return obj => {
    let val = obj
    for (let i = 0; i < pathParts.length; i++) {
      const pathPart = pathParts[i]
      if (val == null) return
      val = val[pathPart]
    }
    return val
  }
}

export const shallowEqualArray = (a, b) => {
  if (!(a && a.length != null && b && b.length != null)) return false
  if (!(a.length === b.length)) return false
  for (let index = 0; index < a.length; index++) {
    if (!(a[index] === b[index])) return false
  }
  return true
}
