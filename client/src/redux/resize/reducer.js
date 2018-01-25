import * as types from '../types'


const initialState = {
  isFixed: true,
  minimalW: 0,
  minimalH: 0,
}

export const resize = (state = initialState, actions) => {
  switch (actions.type) {
    case types.RESIZE_TOGGLE_FIXED: return {
      ...state,
      isFixed: actions.payload,
    }
    case types.RESIZE_GET_MINIMAL_END: return {
      ...state,
      minimalW: actions.payload.w,
      minimalH: actions.payload.h,
    }
    case types.RESIZE_REST_STATE: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
