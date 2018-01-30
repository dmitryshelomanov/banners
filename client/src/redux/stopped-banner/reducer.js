import { withClearing } from '../../helpers/hof'
import * as types from '../types'

/* eslint-disable no-param-reassign */
const initialState = {
  isStopped: false,
  isLoading: false,
  isError: false,
}

const gif = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.STOPPED_BANNER_TOGGLE_STATE: return {
      ...state,
      isStopped: payload,
    }
    case types.STOPPED_BANNER_FETCH: return {
      ...state,
      isLoading: true,
      isError: false,
    }
    case types.STOPPED_BANNER_END: return {
      ...state,
      isLoading: false,
    }
    case types.STOPPED_BANNER_ERROR: return {
      ...state,
      isStopped: !state.isStopped,
      isLoading: false,
      isError: true,
    }
    default: return state
  }
}

export default withClearing(gif)
