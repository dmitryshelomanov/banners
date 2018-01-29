import * as types from '../../redux/types'


export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === types.GIF_GENERATED_END) {
    const { isGif } = getState().stub
    const stub = isGif ? 'gif' : 'jpg'

    dispatch({
      type: types.SET_STUB_WEIGHT,
      payload: {
        stub,
        weight: action.payload,
      },
    })
  }

  return next(action)
}
