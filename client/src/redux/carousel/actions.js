import * as types from '../types'
/* eslint-disable func-names */

/**
 * добавление изображения в карусель
 * @param {*} image
 */
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

/**
 * сжатие изображения в карусели
 * @param {*} image
 * @param {*} q
 */
export function compressActiveImage(image, q) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.COMPRESS,
      request: () => api.compressActiveImage(image, q),
    })
  }
}

/**
 * Изменение данных для карусели
 * @param {*} ids
 * @param {*} data
 */
export function updateCarouselData(ids, data) {
  return async function (dispatch, getState) {
    const { images } = getState().carousel

    images[ids] = {
      ...images[ids],
      ...data,
    }

    dispatch({ type: types.CAROUSEL_UPDATE_DATA, payload: images })
  }
}
