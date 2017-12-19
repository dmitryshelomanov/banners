import { combineReducers } from 'redux'
import { archiveUpload } from './reducers/tree-folder'
import { carousel } from './reducers/carousel'


export const reducers = combineReducers({
  archiveUpload,
  carousel,
})
