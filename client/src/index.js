import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = {}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, 
  document.getElementById('root'));
registerServiceWorker();
