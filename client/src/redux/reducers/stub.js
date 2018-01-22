import * as types from '../types'


const initialState = {
  isGif: true,
}

export const stub = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.STUB_SET_STATE: return {
      ...state,
      isGif: payload,
    }
    case types.STATE_CLEAR_GLOBAL: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
