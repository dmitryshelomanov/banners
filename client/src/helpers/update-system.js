/* eslint-disable no-magic-numbers */

export default (num, system = 'kb') => {
  switch (system) {
    case 'kb':
      return `${Math.floor(num / 1024)}кб`
    default:
      return 0
  }
}
