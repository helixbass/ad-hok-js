export default (test, consequent, alternate = (props) => props) =>
  (props) =>
    test(props) ?
      consequent(props)
    :
      alternate(props)
