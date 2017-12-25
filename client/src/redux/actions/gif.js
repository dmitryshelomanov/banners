import * as types from '../types'

/* eslint-disable func-names */
export function setGifImage(base64, w) {
  return function (dispatch) {
    dispatch({
      type: types.GIS_SET_BASE64,
      payload: { base64, w },
    })
  }
}

export function gifGenerated(imgData, nameFolder) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.GIF_GENERATED,
      request: () => api.gifGenerated(imgData, nameFolder),
    })
  }
}

export function setSize(size) {
  return function (dispatch) {
    dispatch({
      type: types.GIS_SET_SIZE,
      payload: size,
    })
  }
}

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
