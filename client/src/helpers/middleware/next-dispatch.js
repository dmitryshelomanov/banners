export default ({ dispatch }) => next => (action) => {
  if (typeof action.nextDispatch === 'function') {
    dispatch(action.nextDispatch())
  }

  return next(action)
}
