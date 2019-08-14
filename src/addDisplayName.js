const markerPropertyName = '__ad-hok-addDisplayName'

export const isAddDisplayName = func => func[markerPropertyName]

export default displayName => {
  const ret = props => props
  ret[markerPropertyName] = [displayName]
  return ret
}
