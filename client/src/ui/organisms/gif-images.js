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

const GifWrapper = ({ gifs, onGenerateGif, nameFolder }) => (
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
            onClick={() => onGenerateGif({
              w: gifs.w,
              h: gifs.h,
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
    nameFolder: state.archiveUpload.treeFolders.name,
  }),
  dispatch => ({
    onGenerateGif: (imgData, nameFolder) => {
      dispatch(gifGenerated(imgData, nameFolder))
    },
  }),
)(GifWithStyled)
