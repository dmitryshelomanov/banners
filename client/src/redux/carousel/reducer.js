import * as types from '../types'


const initialState = {
  isCompress: false,
  activeImage: null,
  images: [],
}

export const carousel = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CAROUSEL_ADD: {
      const dublicate = state.images.find(i => i.name === payload.name)

      return dublicate
        ? state
        : { ...state, images: [...state.images, payload] }
    }
    case types.COMPRESS_FETCH: return {
      ...state,
      isCompress: true,
    }
    case types.COMPRESS_END: {
      const { name, quality, percentCompress, newSize, originalSize } = payload
      const img = state.images.find(i => i.name === name)

      img.info = {
        quality,
        percentCompress,
        newSize,
        originalSize,
      }
      return {
        ...state,
        isCompress: false,
      }
    }
    case types.CAROUSEL_SET_ACTIVE_IMAGE: return {
      ...state,
      activeImage: payload,
    }
    case types.CAROUSEL_UPDATE_DATA: return {
      ...state,
      images: payload,
    }
    case types.STATE_CLEAR_GLOBAL: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
