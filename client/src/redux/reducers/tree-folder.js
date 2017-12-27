import * as types from '../types'
import fixture from '../../fixture'
import unload from '../../helpers/unload'


const initialState = {
  isLoading: false,
  isError: false,
  nameHtml: fixture.default.nameHtml,
  treeFolders: fixture.default.treeFolder,
}
const io = unload()

export const archiveUpload = (state = initialState, actions) => {
  switch (actions.type) {
    case types.ARCHIVE_FETCH: return {
      ...state,
      isLoading: true,
    }
    case types.ARCHIVE_END:
      io.emit('banner:set-archive-name', {
        nameFolder: actions.payload.tree.name,
      })

      return {
        ...state,
        isLoading: false,
        nameHtml: actions.payload.nameHtml,
        treeFolders: typeof actions.payload === 'string' ? state.treeFolders : actions.payload.tree,
      }
    case types.ARCHIVE_ERROR: return {
      ...state,
      isLoading: false,
      isError: true,
    }
    case types.ARCHIVE_UPDATE_HTML_FILE_END: return {
      ...state,
      nameHtml: actions.payload,
    }
    default: return state
  }
}
