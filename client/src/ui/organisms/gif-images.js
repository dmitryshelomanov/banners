import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  FlexWrap,
  GifItem,
  Carousel,
  Button,
} from '../'
import { gifGenerated } from '../../redux/actions/gif'

/* eslint-disable react/no-array-index-key */

const GifWrapper = ({
  gifs, onGenerateGif, nameFolder, resize,
}) => (
  <FlexWrap
    width="100%"
  >
    {
      gifs.base64.length > 0 && (
        <FlexWrap
          width="100%"
          fd="column"
          ai="center"
        >
          <Carousel
            component={<GifItem />}
            carousel={gifs.base64}
            width={gifs.base64[0].w}
            isGif
          />
          <Button
            className="active-btn"
            text="сохранить"
            thirty
            onClick={() => onGenerateGif({
              w: resize.isFixed ? gifs.w : resize.minimalW,
              h: resize.isFixed ? gifs.h : resize.minimalH,
              data: gifs.data,
              repeat: gifs.repeat,
            }, nameFolder)}
          />
        </FlexWrap>
      )
    }
  </FlexWrap>
)

const GifWithStyled = styled(GifWrapper)`

`

export const GifImages = connect(
  state => ({
    gifs: state.gifs,
    resize: state.resize,
    nameFolder: state.archiveUpload.treeFolders.name,
  }),
  dispatch => ({
    onGenerateGif: (imgData, nameFolder) => {
      dispatch(gifGenerated(imgData, nameFolder))
    },
  }),
)(GifWithStyled)
