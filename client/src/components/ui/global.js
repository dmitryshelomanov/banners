import { injectGlobal } from 'styled-components'


export default () => injectGlobal`
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0
  }
  #root {
    width: 100%;
    heigth: 100%
  }
`