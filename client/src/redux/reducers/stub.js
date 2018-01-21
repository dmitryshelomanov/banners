import * as types from '../types'


const initialState = {
  isGif: true,
}

export const stub = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.RESIZE_TOGGLE_FIXED: return {
      ...state,
      isGif: payload,
    }
    case types.RESIZE_REST_STATE: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
