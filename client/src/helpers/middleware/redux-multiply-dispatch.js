export default ({ dispatch }) => next => (action) => {
  let lastAction = action

  if (Array.isArray(action)) {
    for (let i = 0; i < action.length; i++) {
      dispatch(action[i])
    }
    lastAction = action[action.length - 1]
  }

  return next(lastAction)
}
