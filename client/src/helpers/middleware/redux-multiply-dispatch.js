export default ({ dispatch }) => next => (action) => {
  if (Array.isArray(action)) {
    for (let i = 0; i < action.length; i++) {
      dispatch(action[i])
    }
    return true
  }

  return next(action)
}
