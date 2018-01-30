export const getStoppedState = (state) => state.stoppedBanner.isStopped
export const getStateFetch = (state) => ({
  isError: state.stoppedBanner.isError,
  isLoading: state.stoppedBanner.isLoading,
})
