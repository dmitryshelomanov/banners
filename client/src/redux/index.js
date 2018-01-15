import { combineReducers } from 'redux'
import { archiveUpload } from './reducers/tree-folder'
import { carousel } from './reducers/carousel'
import { gif } from './reducers/gif'
import { player } from './reducers/banner'
import { resize } from './reducers/resize'


export const reducers = combineReducers({
  archiveUpload,
  carousel,
  gifs: gif,
  player,
  resize,
})
