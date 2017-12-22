import * as types from '../types'


const initialState = {
  isLoading: false,
  isError: false,
  treeFolders: {"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip","name":"b6170ef2224f0d26f65df541b02e7d67--240x400.zip","children":[{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\240x400.html","name":"240x400.html","size":4041,"extension":".html","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\240x400.js","name":"240x400.js","size":46686,"extension":".js","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images","name":"images","children":[{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images\\kn.png","name":"kn.png","size":910,"extension":".png","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images\\pic2.jpg","name":"pic2.jpg","size":121955,"extension":".jpg","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images\\pic4.jpg","name":"pic4.jpg","size":65229,"extension":".jpg","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images\\pic5.jpg","name":"pic5.jpg","size":49459,"extension":".jpg","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images\\te.png","name":"te.png","size":6693,"extension":".png","type":"file"},{"path":"C:\\Users\\Анатолий\\Desktop\\open_source\\banners\\server\\tmp\\decompress\\b6170ef2224f0d26f65df541b02e7d67--240x400.zip\\images\\tuman.jpg","name":"tuman.jpg","size":25144,"extension":".jpg","type":"file"}],"size":269390,"type":"directory"}],"size":320117,"type":"directory"},
}

export const archiveUpload = (state = initialState, actions) => {
  switch (actions.type) {
    case types.ARCHIVE_FETCH: return {
      ...state,
      isLoading: true,
    }
    case types.ARCHIVE_END: return {
      ...state,
      isLoading: false,
      treeFolders: typeof actions.payload === 'string' ? state.treeFolders : actions.payload,
    }
    case types.ARCHIVE_ERROR: return {
      ...state,
      isLoading: false,
      isError: true,
    }
    default: return state
  }
}
