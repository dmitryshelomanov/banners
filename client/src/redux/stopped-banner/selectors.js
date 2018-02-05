export const getStoppedState = (state) => state.stoppedBanner.isStopped
export const getStoppedRepeat = (state) => state.stoppedBanner.repeatNumber
export const getStateFetch = (state) => ({
  isError: state.stoppedBanner.isError,
  isLoading: state.stoppedBanner.isLoading,
})
