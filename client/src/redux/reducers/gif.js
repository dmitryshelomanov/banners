import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  w: 0,
  h: 0,
  repeat: 0,
  base64: [],
  data: [],
}

export const gif = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GIF_SET_IMAGE: return {
      ...state,
      data: [...state.data, actions.payload],
    }
    case types.GIS_SET_SIZE: return {
      ...state,
      w: actions.payload.w,
      h: actions.payload.h,
    }
    case types.GIS_SET_BASE64: return {
      ...state,
      base64: [...state.base64, actions.payload],
    }
    case types.GIS_SET_DATA: return {
      ...state,
      data: actions.payload,
    }
    default: return state
  }
}
