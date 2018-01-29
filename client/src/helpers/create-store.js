import {
  applyMiddleware,
  createStore,
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { reducers } from '../redux'
import fetch from './middleware/fetch'
import nextDispatch from './middleware/next-dispatch'
import reduxMultiplyDispatch from './middleware/redux-multiply-dispatch'
import setStubWeight from './middleware/set-stub-weight'
import { api } from './api'


export const store = createStore(
  reducers,
  applyMiddleware(
    thunk.withExtraArgument({ api }),
    logger,
    fetch,
    nextDispatch,
    reduxMultiplyDispatch,
    setStubWeight,
  ),
)
