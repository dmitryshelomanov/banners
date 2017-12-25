import * as types from '../types'


const initialState = {
  isLoading: false,
  isError: false,
  treeFolders: {},
}

export const archiveUpload = (state = initialState, actions) => {
  switch (actions.type) {
    case types.ARCHIVE_FETCH: return {
      ...state,
      isLoading: true,
    }
    case types.ARCHIVE_END: return {
      ...state,
      isLoading: false,
      treeFolders: typeof actions.payload === 'string' ? state.treeFolders : actions.payload,
    }
    case types.ARCHIVE_ERROR: return {
      ...state,
      isLoading: false,
      isError: true,
    }
    default: return state
  }
}
