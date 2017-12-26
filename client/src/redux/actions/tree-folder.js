import * as types from '../types'
/* eslint-disable func-names */
/**
 * Загрузка архива на сервер и получение дерева каталога
 * @param {*} file
 */
export function uploadFile(file) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.ARCHIVE,
      request: () => api.uploadArchive(file),
    })
  }
}

/**
 * Изменение файла html в архиве (process folder)
 * @param {*} newName
 * @param {*} oldName
 * @param {*} nameFolder
 */
export function renameHtmlFile({ newName, oldName, nameFolder }) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.ARCHIVE_UPDATE_HTML_FILE,
      request: () => api.renameHtmlFile({
        newName,
        oldName,
        nameFolder,
      }),
    })
  }
}
