import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  isLoading: false,
  isError: false,
  error: {},
  firmwareData: [],
}

export const firmware = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AREA_FIRMWARE_FETCH: return {
      ...state,
      isLoading: true,
    }
    case types.AREA_FIRMWARE_END:
      return {
        ...state,
        isLoading: false,
        firmwareData: [...state.firmwareData, payload],
      }
    case types.AREA_FIRMWARE_ERROR: return {
      ...state,
      isError: true,
      error: payload,
    }
    case types.STATE_CLEAR_GLOBAL: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
