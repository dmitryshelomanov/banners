export const getGifData = (state, props) => state.gifs.data
export const getGifs = (state, props) => state.gifs
export const getGifSize = (state, props) => ({
  gifH: state.gifs.h,
  gifW: state.gifs.w,
})
