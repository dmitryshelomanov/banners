export default ({ dispatch, getState }) => next => action => { 

  if (typeof action.request === "function") {
    dispatch({ type: `${action.type}_FETCH` })

    action.request().then(response => {
      dispatch({ 
        type: `${action.type}_END`, 
        payload: response.data,
      })
    }).catch(err => {
      dispatch({ type: `${action.type}_ERROR` });
    })
  }

  return next(action)
}
