import * as types from '../types'
import { compressExt } from '../../config'
/* eslint-disable func-names */

/**
 * Добавлениие картинки в формате base64
 * @param {*} base64
 * @param {*} w
 */
export function setGifImage(base64, w) {
  return function (dispatch, getState) {
    const { ids } = getState().gifs
    const nextIds = ids + 1
    const payload = {
      ids,
      base64,
      name: `${ids}.${compressExt}`,
      w,
    }

    dispatch([
      { type: types.GIS_SET_BASE64, payload },
      { type: types.GIF_INCREMENT_IDS, payload: nextIds },
    ])
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
      request: () => api.stubGenerated(imgData, nameFolder),
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

    base64Data.splice(base64Data.findIndex(el => el.ids === ids), 1)
    dispatch({
      type: types.GIF_UNSET_DATA,
      payload: { base64Data },
    })
  }
}

export function setRepeat(state) {
  return function (dispatch) {
    dispatch({
      type: types.GIF_SET_REPEAT,
      payload: state,
    })
  }
}

export function updateGifData(ids, data) {
  return function (dispatch, getState) {
    const index = getState().gifs.base64.findIndex(el => el.ids === ids)
    const { base64 } = getState().gifs

    base64[index] = {
      ...base64[index],
      ...data,
    }
    dispatch({ type: types.GIF_UPDATE_DATA, payload: base64 })
  }
}
