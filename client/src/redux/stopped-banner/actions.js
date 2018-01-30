import * as types from '../types'
/* eslint-disable func-names */

export function setStoppedState(state, times) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.STOPPED_BANNER_TOGGLE_STATE,
      payload: state,
      nextDispatch: () => ({
        type: types.STOPPED_BANNER,
        request: () => api.setStoppedState({ state, times }),
      }),
    })
  }
}
