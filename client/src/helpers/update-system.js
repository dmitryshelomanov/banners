/* eslint-disable no-magic-numbers */

export default (num, system = 'kb') => {
  switch (system) {
    case 'kb':
      return `${Math.ceil(num / 1024)}кб`
    default:
      return 0
  }
}
