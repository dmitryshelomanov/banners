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
