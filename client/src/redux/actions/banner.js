import * as types from '../types'

/* eslint-disable func-names */

/**
 * Изменение готовности плеера
 * @param {*} state true|false
 */
export function togglePlayerReady(state) {
  return function (dispatch) {
    dispatch({
      type: types.PLAYER_SET_STATE,
      payload: state,
    })
  }
}

/**
 * Изменение цвета фона
 * @param {*} hex цвет
 */
export function setBgPlayer(hex) {
  return function (dispatch) {
    dispatch({
      type: types.PLAYER_SET_BACKGROUND,
      payload: hex,
    })
  }
}

/**
 * Изменение цвета бордера у канваса
 * @param {*} hex цвет
 */
export function setBorderColor(hex) {
  return function (dispatch) {
    dispatch({
      type: types.PLAYER_SET_BORDER_COLOR,
      payload: hex,
    })
  }
}
