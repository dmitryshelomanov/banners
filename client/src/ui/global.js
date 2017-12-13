import { injectGlobal } from 'styled-components'


export const globalStyles = () => injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Exo+2');
  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Exo 2', sans-serif !important;
  }
  #root {
    width: 100%;
    height: 100%
  }
  input[type=file] {
    display: none
  }
`
