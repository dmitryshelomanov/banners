import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputNumber from 'rc-input-number'
import {
  FlexWrap,
  GifItem,
  Carousel,
  Button,
  Text,
  CheckBox,
} from '../'
import {
  gifGenerated,
  setRepeat,
} from '../../redux/actions/gif'
import { toggleStubState } from '../../redux/actions/stub'
/* eslint-disable react/no-array-index-key */

const Wrapper = FlexWrap.extend`
  width: 100%;
  flex-direction: column;
  & .btn-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  & .repeat-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    & p {
      font-weight: bold;
      margin-right: 15px;
    }
  }
  & .stub-wrapper {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  & .stub-wrapper-image {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  & .gif-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center
  }
`

class GifWrapper extends Component {
  getSaveComputed = () => {
    const { resize, gifs, stub } = this.props
    const size = {
      w: resize.isFixed ? gifs.w : resize.minimalW,
      h: resize.isFixed ? gifs.h : resize.minimalH,
      repeat: gifs.repeat,
      isGif: stub.isGif,
    }

    if (stub.isGif) {
      return {
        ...size,
        data: gifs.data,
      }
    }
    return {
      ...size,
      data: stub.jpgStub,
    }
  }

  render() {
    const {
      gifs,
      onGenerateGif,
      nameFolder,
      onSetRepeatState,
      stub,
      onToggleStub,
    } = this.props

    return (
      <Wrapper>
        <div className="stub-wrapper">
          <CheckBox
            checked={stub.isGif}
            id="stub"
            name="stub"
            type="checkbox"
            label="GIF"
            onChange={() => {
              onToggleStub(!stub.isGif)
            }}
          />
        </div>
        {!stub.isGif && stub.jpgStub && (
          <div className="stub-wrapper-image">
            <img
              alt="stub"
              src={stub.jpgStub}
            />
          </div>
        )}
        {
          gifs.base64.length > 0 && (
            <div className="gif-wrapper">
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
                  onClick={() => {
                    onGenerateGif(
                      this.getSaveComputed(),
                      nameFolder,
                    )
                  }}
                />
              </div>
            </div>
          )
        }
      </Wrapper>
    )
  }
}

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
    onToggleStub: (state) => {
      dispatch(toggleStubState(state))
    },
  }),
)(GifWrapper)
