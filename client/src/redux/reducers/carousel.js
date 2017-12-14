import * as types from '../types'


const initialState = {
  activeImage: null,
  images: []
}

export const carousel = (state = initialState, actions) => {
  switch (actions.type) {
    case types.CAROUSEL_ADD:
      let dublicate = state.images.find(i => i.name === actions.payload.name)
      return dublicate
        ? state
        : { ...state, images: [...state.images, actions.payload] }
    case types.COMPRESS_END:
      let { name, quality, percentCompress, newSize, originalSize } = actions.payload
      let img = state.images.find(i => i.name === name)

      img.info = {
        quality,
        percentCompress,
        newSize,
        originalSize
      }
      return { ...state }
    case types.CAROUSEL_SET_ACTIVE_IMAGE: return {
      ...state,
      activeImage: actions.payload
    }
    default: return state
  }
}
