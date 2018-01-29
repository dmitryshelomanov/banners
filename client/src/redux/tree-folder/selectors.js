export const getFolders = (state) => state.archiveUpload.treeFolders
export const getArchiveName = (state) => state.archiveUpload.treeFolders.name
export const getArchiveFileName = (state) => state.archiveUpload.nameHtml
export const getArchiveReadyState = (state) => state.archiveUpload.archiveReady
export const getState = (state) => ({
  isError: state.archiveUpload.isError,
  isLoading: state.archiveUpload.isLoading,
})
