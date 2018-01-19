import * as types from '../types'
/* eslint-disable func-names */

export function toggleFixedState(state) {
  return function (dispatch) {
    dispatch({
      type: types.RESIZE_TOGGLE_FIXED,
      payload: state,
    })
  }
}

export function getMinimalSize(nameFolder, nameFile) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.RESIZE_GET_MINIMAL_SIZE,
      request: () => api.getMinimalSize({ nameFolder, nameFile }),
    })
  }
}

export function resizeClearState() {
  return function (dispatch) {
    dispatch({ type: types.RESIZE_REST_STATE })
  }
}
