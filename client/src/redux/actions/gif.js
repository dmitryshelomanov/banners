import * as types from '../types'
/* eslint-disable func-names */

/**
 * Добавлениие картинки в формате base64
 * @param {*} base64
 * @param {*} w
 */
export function setGifImage(base64, w) {
  return function (dispatch) {
    dispatch({
      type: types.GIS_SET_BASE64,
      payload: { base64, w },
    })
  }
}

/**
 * Генерация гиф
 * @param {*} imgData данные
 * @param {*} nameFolder имя папки
 */
export function gifGenerated(imgData, nameFolder) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.GIF_GENERATED,
      request: () => api.gifGenerated(imgData, nameFolder),
    })
  }
}

/**
 * Указание размера для гифки
 * @param {*} size обьект содержащий высоты и ширину
 */
export function setSize(size) {
  return function (dispatch) {
    dispatch({
      type: types.GIS_SET_SIZE,
      payload: size,
    })
  }
}

/**
 * Создание массива с данными для генерации гиф
 */
export function setGifData({ path, delay, ids }) {
  return function (dispatch, getState) {
    const gifData = getState().gifs.data

    gifData[ids] = {
      path,
      delay,
    }
    dispatch({
      type: types.GIS_SET_DATA,
      payload: gifData,
    })
  }
}
