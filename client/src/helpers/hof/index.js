export const withClearing = (reducer) => (state, action) => (
  reducer(action.type === 'clearing' ? undefined : state, action)
)
