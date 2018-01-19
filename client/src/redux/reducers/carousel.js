import * as types from '../types'


const initialState = {
  activeImage: null,
  images: [],
}

export const carousel = (state = initialState, actions) => {
  switch (actions.type) {
    case types.CAROUSEL_ADD: {
      const dublicate = state.images.find(i => i.name === actions.payload.name)

      return dublicate
        ? state
        : { ...state, images: [...state.images, actions.payload] }
    }
    case types.COMPRESS_END: {
      const { name, quality, percentCompress, newSize, originalSize } = actions.payload
      const img = state.images.find(i => i.name === name)

      img.info = {
        quality,
        percentCompress,
        newSize,
        originalSize,
      }
      return { ...state }
    }
    case types.CAROUSEL_SET_ACTIVE_IMAGE: return {
      ...state,
      activeImage: actions.payload,
    }
    case types.CAROUSEL_REST_STATE: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
