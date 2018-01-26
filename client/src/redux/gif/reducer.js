import { withClearing } from '../../helpers/hof'
import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  ids: 0,
  w: 0,
  h: 0,
  repeat: 0,
  base64: [],
}

const gif = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GIS_SET_SIZE: return {
      ...state,
      w: payload.w,
      h: payload.h,
    }
    case types.GIS_SET_BASE64: return {
      ...state,
      base64: [...state.base64, payload],
    }
    case types.GIF_UNSET_DATA: return {
      ...state,
      base64: payload.base64Data,
    }
    case types.GIF_UPDATE_DATA: return {
      ...state,
      base64: payload,
    }
    case types.GIF_SET_REPEAT: return {
      ...state,
      repeat: payload,
    }
    case types.GIF_INCREMENT_IDS: return {
      ...state,
      ids: payload,
    }
    default: return state
  }
}

export default withClearing(gif)
