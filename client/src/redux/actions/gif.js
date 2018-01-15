import * as types from '../types'
/* eslint-disable func-names */

/**
 * Добавлениие картинки в формате base64
 * @param {*} base64
 * @param {*} w
 */
export function setGifImage(base64, w) {
  return function (dispatch) {
    const name = Math.random().toString(36).substring(2, 15)

    dispatch({
      type: types.GIS_SET_BASE64,
      payload: { base64, w, name },
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

export function setBorderFromCanvas(data) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.SET_BORDER,
      request: () => api.setBorderFromCanvas(data),
    })
  }
}

/**
 * Удаление изображения из заглушки
 * @param {*} ids
 */
export function unsetData(ids) {
  return function (dispatch, getState) {
    const base64Data = getState().gifs.base64
    const gifData = getState().gifs.data

    gifData.splice(ids, 1)
    base64Data.splice(ids, 1)
    dispatch({
      type: types.GIF_UNSET_DATA,
      payload: { base64Data, gifData },
    })
  }
}
