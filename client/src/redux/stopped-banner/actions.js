import * as types from '../types'
/* eslint-disable func-names */

export function setStoppedState(data) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.STOPPED_BANNER_TOGGLE_STATE,
      payload: data.isStopped,
      nextDispatch: () => ({
        type: types.STOPPED_BANNER,
        request: () => api.setStoppedState(data),
      }),
    })
  }
}

export function setRepeat(num) {
  return function (dispatch) {
    dispatch({
      type: types.STOPPED_BANNER_SET_REPEAT,
      payload: num,
    })
  }
}
