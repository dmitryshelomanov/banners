import { withClearing } from '../../helpers/hof'
import * as types from '../types'


const initialState = {
  isGif: true,
  jpgStub: null,
}

const stub = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.STUB_SET_STATE: return {
      ...state,
      isGif: payload,
    }
    case types.SET_JPG_STUB: return {
      ...state,
      jpgStub: payload,
    }
    default: return state
  }
}

export default withClearing(stub)
