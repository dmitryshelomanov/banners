import * as types from '../types'
/* eslint-disable func-names */

export function getAreaInfo() {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.AREA_GET,
      request: () => api.getAreaInfo(),
    })
  }
}

export function setActiveKey(key) {
  return async function (dispatch) {
    dispatch({
      type: types.AREA_SET_KEY,
      payload: key,
    })
  }
}

export function firmware(id) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.AREA_FIRMWARE,
      request: () => api.firmware(id),
    })
  }
}
