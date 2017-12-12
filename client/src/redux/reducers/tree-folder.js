import * as types from '../types'


const initialState = {
  isLoading: false,
  isError: false,
  treeFolders: {}
}

export const treeFolder = (state = initialState, actions) => {
  switch(actions.type) {
    case types.TREE_FETCH: return {
      ...state,
      isLoading: true
    }
    case types.TREE_END: return {
      ...state,
      isLoading: false,
      treeFolders: typeof actions.payload === 'string' ? state.treeFolders : actions.payload
    }
    case types.TREE_ERROR: return {
      ...state,
      isLoading: false,
      isError: true
    }
    default: return state
  }
}
