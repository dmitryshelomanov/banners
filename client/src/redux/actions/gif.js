import * as types from '../types'


export const setGifImage = (base64, w) => (dispatch) => {
  dispatch({
    type: types.GIF_SET_IMAGE,
    payload: {
      base64,
      w,
    },
  })
}
