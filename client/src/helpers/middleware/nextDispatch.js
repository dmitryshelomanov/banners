export default ({ dispatch, getState }) => next => action => { 
  
    if (typeof action.nextDispatch === "function") {
      dispatch(action.nextDispatch())
    }
  
    return next(action)
  }
  