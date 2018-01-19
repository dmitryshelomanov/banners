import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  FlexWrap,
  GifItem,
  Carousel,
  Button,
  CheckBox,
} from '../'
import { gifGenerated } from '../../redux/actions/gif'

/* eslint-disable react/no-array-index-key */

const Wrapper = FlexWrap.extend`
  width: 100%;
  & .btn-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    & button {
      margin-bottom: 15px
    }
  }
`

const GifWrapper = ({
  gifs, onGenerateGif, nameFolder, resize,
}) => (
  <Wrapper>
    {
      gifs.base64.length > 0 && (
        <FlexWrap
          w="100%"
          fd="column"
          ai="center"
        >
          <Carousel
            component={<GifItem />}
            carousel={gifs.base64}
            w={gifs.base64[0].w}
            isGif
          />
          <div className="btn-wrap">
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
            <CheckBox
              name="repeat"
              type="checkbox"
              label="повторять?"
            />
          </div>
        </FlexWrap>
      )
    }
  </Wrapper>
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
