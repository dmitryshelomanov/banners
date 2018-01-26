import { withClearing } from '../../helpers/hof'
import * as types from '../types'


const initialState = {
  isCompress: false,
  activeImage: null,
  images: [],
}

const carousel = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CAROUSEL_ADD: return {
      ...state,
      images: [...state.images, payload],
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
    default: return state
  }
}

export default withClearing(carousel)
