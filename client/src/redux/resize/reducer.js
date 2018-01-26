import { withClearing } from '../../helpers/hof'
import * as types from '../types'


const initialState = {
  isFixed: true,
  minimalW: 0,
  minimalH: 0,
}

const resize = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.RESIZE_TOGGLE_FIXED: return {
      ...state,
      isFixed: payload,
    }
    case types.RESIZE_GET_MINIMAL_END: return {
      ...state,
      minimalW: payload.w,
      minimalH: payload.h,
    }
    default: return state
  }
}

export default withClearing(resize)
