import { withClearing } from '../../helpers/hof'
import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  playerReady: false,
  bodyColor: '#ffffff',
  borderColor: 'transparent',
  borderSize: 1,
  fps: -1,
}

const player = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.PLAYER_SET_STATE: return {
      ...state,
      playerReady: payload,
    }
    case types.PLAYER_SET_BACKGROUND: return {
      ...state,
      bodyColor: payload,
    }
    case types.PLAYER_SET_BORDER_COLOR: return {
      ...state,
      borderColor: payload,
    }
    case types.BANNER_UPDATE_BORDER_SIZE: return {
      ...state,
      borderSize: payload,
    }
    case types.PLAYER_SET_FPS: return {
      ...state,
      fps: payload,
    }
    default: return state
  }
}

export default withClearing(player)
