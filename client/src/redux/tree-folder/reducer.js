import * as types from '../types'
import { withClearing } from '../../helpers/hof'
import fixture from '../../fixture'
import io from '../../helpers/io'


const initialState = {
  archiveReady: true,
  isLoading: false,
  isError: false,
  nameHtml: fixture.work.treeFolder.nameHtml,
  treeFolders: fixture.work.treeFolder.tree,
}

const archiveUpload = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.ARCHIVE_FETCH: return {
      ...state,
      isLoading: true,
      isError: false,
      archiveReady: false,
    }
    case types.ARCHIVE_END:
      io.emit('banner:set-archive-name', {
        nameFolder: payload.tree.name,
      })

      return {
        ...state,
        archiveReady: true,
        isLoading: false,
        nameHtml: payload.nameHtml,
        treeFolders: typeof payload === 'string' ? state.treeFolders : payload.tree,
      }
    case types.ARCHIVE_ERROR: return {
      ...state,
      archiveReady: false,
      isLoading: false,
      isError: true,
    }
    default: return state
  }
}

export default withClearing(archiveUpload)
