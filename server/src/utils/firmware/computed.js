const types = require('./types')
const addElement = require('./hooks/add-element')
const wrapElement = require('./hooks/wrapp-element')


module.exports = (rule, initialHtml) => {
  switch (rule.type) {
    case types.ADD: return () => addElement(rule, initialHtml)
    case types.WRAPP: return nextHtml => wrapElement(rule, nextHtml)
    default: return null
  }
}
