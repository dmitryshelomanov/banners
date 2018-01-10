import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  playerReady: false,
}

export const player = (state = initialState, actions) => {
  switch (actions.type) {
    case types.PLAYER_SET_STATE: return {
      ...state,
      playerReady: actions.payload,
    }
    default: return state
  }
}
