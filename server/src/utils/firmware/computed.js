const types = require('./types')
const addElement = require('./hooks/add-element')
const wrapElement = require('./hooks/wrapp-element')
const subScript = require('./hooks/script-substitution')


module.exports = (rule) => {
  switch (rule.type) {
    case types.ADD: return html => addElement(rule, html)
    case types.WRAPP: return html => wrapElement(rule, html)
    case types.SCRIPT_SUB: return html => subScript(rule, html)
    default: return null
  }
}
