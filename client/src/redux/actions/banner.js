import * as types from '../types'

/* eslint-disable func-names */
export function togglePlayerReady(state) {
  return function (dispatch, getState, { api }) {
    dispatch({
      type: types.PLAYER_SET_STATE,
      payload: state,
    })
  }
}
