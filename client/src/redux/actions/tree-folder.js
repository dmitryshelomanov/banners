import * as types from '../types'

/* eslint-disable func-names */
export function uploadFile(file) {
  return async function (dispatch, getState, { api }) {
    dispatch({
      type: types.ARCHIVE,
      request: () => api.uploadArchive(file),
    })
  }
}
