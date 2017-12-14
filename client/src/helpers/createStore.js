import {
  applyMiddleware, 
  createStore
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { reducers } from '../redux'
import fetch from './middleware/fetch'
import nextDispatch from './middleware/nextDispatch'


export const store = createStore(
  reducers,
  applyMiddleware(
    thunk, logger, fetch, nextDispatch
  )
)
