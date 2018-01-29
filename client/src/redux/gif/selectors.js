export const getGifData = (state) => state.gifs.data
export const getGifs = (state) => state.gifs
export const getGifSize = (state) => ({
  gifH: state.gifs.h,
  gifW: state.gifs.w,
})
