import * as types from '../types'


const initialState = {
  images: []
}

export const carousel = (state = initialState, actions) => {
  switch(actions.type) {
    case types.CAROUSEL_ADD: return {
      ...state,
      images: [...state.images, actions.payload]
    }
    default: return state
  }
}
