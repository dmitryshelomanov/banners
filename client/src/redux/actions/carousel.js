import axios from 'axios'
import * as types from '../types'


export const addImageToCarousel = image => (dispatch) => {
  dispatch({
    type: types.CAROUSEL_ADD,
    payload: image,
    nextDispatch: () => ({
      type: types.COMPRESS,
      request: () => axios.post('http://127.0.0.1:8000/compress/img', image),
    }),
  })
}

export const compressActiveImage = (image, q) => (dispatch) => {
  dispatch({
    type: types.COMPRESS,
    request: () => axios.post(`http://127.0.0.1:8000/compress/img?quality=${q}`, image),
  })
}
