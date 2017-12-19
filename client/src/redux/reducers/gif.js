import * as types from '../types'


const initialState = {
  data: [],
}

export const gif = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GIF_SET_IMAGE: return {
      ...state,
      data: [...state.data, actions.payload],
    }
    default: return state
  }
}
