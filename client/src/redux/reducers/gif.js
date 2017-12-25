import * as types from '../types'


const initialState = {
  w: 0,
  h: 0,
  repeat: 0,
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
    default: return state
  }
}
