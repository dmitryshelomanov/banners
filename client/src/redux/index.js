import { combineReducers } from 'redux'

import archiveUpload from './tree-folder/reducer'
import firmware from './firmware/reducer'
import resize from './resize/reducer'
import stub from './stub/reducer'
import gif from './gif/reducer'
import area from './area/reducer'
import player from './banner/reducer'
import carousel from './carousel/reducer'


export const reducers = combineReducers({
  archiveUpload,
  carousel,
  gifs: gif,
  player,
  resize,
  area,
  firmware,
  stub,
})
