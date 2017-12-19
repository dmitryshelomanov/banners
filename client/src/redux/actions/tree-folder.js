import axios from 'axios'
import * as types from '../types'


export const uploadFile = file => (dispatch) => {
  dispatch({
    type: types.ARCHIVE,
    request: () => axios.post('http://localhost:8000/upload', file),
  })
}
