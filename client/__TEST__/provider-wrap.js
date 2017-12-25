import React from 'react'
import { Provider } from 'react-redux'


export const wrapProvider = (Component, store) => (
  <Provider store={store}>
    <Component />
  </Provider>
)
