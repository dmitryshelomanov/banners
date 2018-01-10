import { injectGlobal } from 'styled-components'
import 'react-input-range/lib/css/index.css'
import '../assets/css/controllRange.css'
import mariadEot from '../assets/fonts/8143.eot'
import mariadWoff from '../assets/fonts/8143.woff'
import mariadTtf from '../assets/fonts/8143.ttf'
import mariadSvg from '../assets/fonts/8143.svg'


export const globalStyles = () => injectGlobal`
  @font-face {
    font-family: 'Myriad';
    src: url(${mariadEot});
    src: local('☺'), url(${mariadWoff}) format('woff'), url(${mariadTtf}) format('truetype'), url(${mariadSvg}) format('svg');
    font-weight: normal;
    font-style: normal;
  }
  body {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Myriad' !important;
    background: #f5f5f5;
  }
  #root {
    width: 100%;
    height: auto
  }
  input[type=file] {
    display: none
  }
`
