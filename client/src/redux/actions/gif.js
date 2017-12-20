import * as types from '../types'

/* eslint-disable func-names */
export function setGifImage(base64, w) {
  return function (dispatch) {
    dispatch({
      type: types.GIF_SET_IMAGE,
      payload: { base64, w },
    })
  }
}


export function gifGenerated(name) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.GIF_GENERATED,
      requesr: api.gifGenerated(name),
    })
  }
}
