export const ifProp = (name, ifStyles, elseStyles = null) => props => props[name]
  ? ifStyles
  : elseStyles
