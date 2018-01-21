import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import InputNumber from 'rc-input-number'
import {
  FlexWrap,
  GifItem,
  Carousel,
  Button,
  Text,
} from '../'
import {
  gifGenerated,
  setRepeat,
} from '../../redux/actions/gif'

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
  & .repeat-wrapper {
    display: flex;
    align-items: center;
    & p {
      font-weight: bold;
      margin-right: 15px;
    }
  }
`

const GifWrapper = ({
  gifs, onGenerateGif, nameFolder, resize, onSetRepeatState, stub,
}) => (
  <Wrapper>
    {
      gifs.base64.length > 0 && (
        <FlexWrap
          w="100%"
          fd="column"
          ai="center"
        >
          {stub.isGif && (
            <Carousel
              component={<GifItem />}
              carousel={gifs.base64}
              w={gifs.base64[0].w}
              isGif
            />
          )}
          <div className="btn-wrap">
            {stub.isGif && (
              <div
                className="repeat-wrapper"
              >
                <Text>
                  Количество повторов (0 - бесконечно, -1 - не повторять)
                </Text>
                <InputNumber
                  min={-1}
                  max={10}
                  value={gifs.repeat}
                  onChange={(value) => {
                    onSetRepeatState(value)
                  }}
                />
              </div>
            )}
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
    stub: state.stub,
  }),
  dispatch => ({
    onGenerateGif: (imgData, nameFolder) => {
      dispatch(gifGenerated(imgData, nameFolder))
    },
    onSetRepeatState: (state) => {
      dispatch(setRepeat(state))
    },
  }),
)(GifWithStyled)
