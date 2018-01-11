import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  playerReady: false,
  bodyColor: '#ffffff',
  borderColor: '#ffffff',
  borderSize: 1,
}

export const player = (state = initialState, actions) => {
  switch (actions.type) {
    case types.PLAYER_SET_STATE: return {
      ...state,
      playerReady: actions.payload,
    }
    case types.PLAYER_SET_BACKGROUND: return {
      ...state,
      bodyColor: actions.payload,
    }
    default: return state
  }
}
