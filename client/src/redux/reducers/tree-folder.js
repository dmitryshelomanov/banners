import * as types from '../types'
import fixture from '../../fixture'
import io from '../../helpers/io'


const initialState = {
  archiveReady: true,
  isLoading: false,
  isError: false,
  nameHtml: fixture.work.treeFolder.nameHtml,
  treeFolders: fixture.work.treeFolder.tree,
}

export const archiveUpload = (state = initialState, actions) => {
  switch (actions.type) {
    case types.ARCHIVE_FETCH: return {
      ...state,
      isLoading: true,
      archiveReady: false,
    }
    case types.ARCHIVE_END:
      io.emit('banner:set-archive-name', {
        nameFolder: actions.payload.tree.name,
      })

      return {
        ...state,
        archiveReady: true,
        isLoading: false,
        nameHtml: actions.payload.nameHtml,
        treeFolders: typeof actions.payload === 'string' ? state.treeFolders : actions.payload.tree,
      }
    case types.ARCHIVE_ERROR: return {
      ...state,
      archiveReady: false,
      isLoading: false,
      isError: true,
    }
    case types.ARCHIVE_REST_STATE: return {
      ...state,
      ...initialState,
    }
    default: return state
  }
}
