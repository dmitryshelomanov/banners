import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  activeKey: 0,
  isReady: false,
  isLoading: false,
  isError: false,
  data: [],
}

const area = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AREA_GET_FETCH: return {
      ...state,
      isLoading: true,
    }
    case types.AREA_GET_END: return {
      ...state,
      activeKey: payload[0].id || 0,
      data: payload,
      isLoading: false,
      isReady: true,
    }
    case types.AREA_GET_ERROR: return {
      ...state,
      isLoading: false,
      isError: true,
    }
    case types.AREA_SET_KEY: return {
      ...state,
      activeKey: payload,
    }
    default: return state
  }
}

export default area
