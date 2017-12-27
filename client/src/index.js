import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import { globalStyles } from './ui/global'
import { Main } from './pages/main'
import { store } from './helpers/create-store'


globalStyles()

const theme = {}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Main />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
