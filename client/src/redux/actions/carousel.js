import * as types from '../types'

/* eslint-disable func-names */
export function addImageToCarousel(image) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.CAROUSEL_ADD,
      payload: image,
      nextDispatch: () => ({
        type: types.COMPRESS,
        request: () => api.compressImage(image),
      }),
    })
  }
}

export function compressActiveImage(image, q) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.COMPRESS,
      request: () => api.compressActiveImage(image, q),
    })
  }
}
