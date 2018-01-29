import { withClearing } from '../../helpers/hof'
import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  isLoading: false,
  isError: false,
  error: {},
  firmwareData: [],
}

const firmware = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.AREA_FIRMWARE_FETCH: return {
      ...state,
      isLoading: true,
      isError: false,
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
    default: return state
  }
}

export default withClearing(firmware)
