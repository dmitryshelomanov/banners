import { combineReducers } from 'redux'
import { archiveUpload } from './reducers/tree-folder'
import { carousel } from './reducers/carousel'
import { gif } from './reducers/gif'


export const reducers = combineReducers({
  archiveUpload,
  carousel,
  gifs: gif,
})
