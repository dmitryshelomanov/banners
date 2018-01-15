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
