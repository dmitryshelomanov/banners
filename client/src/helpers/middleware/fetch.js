export default ({ dispatch }) => next => (action) => {
  if (typeof action.request === 'function') {
    dispatch({ type: `${action.type}_FETCH` })

    action.request().then((response) => {
      dispatch({
        type: `${action.type}_END`,
        payload: response.data,
      })
    }).catch((error) => {
      dispatch({ type: `${action.type}_ERROR`, payload: error })
      return false
    })
  }

  return next(action)
}
