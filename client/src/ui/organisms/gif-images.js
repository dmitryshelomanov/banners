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
import WithContainer from '../../hocs/with-gif-change-container'
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
    margin-bottom: 25px;
  }
  & .gif-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center
  }
`

const GifItemWithHoc = WithContainer(GifItem)

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
        data: gifs.base64,
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
        <div className="gif-wrapper">
          {stub.isGif && gifs.base64.length > 0 && (
            <Carousel
              component={<GifItemWithHoc />}
              carousel={gifs.base64}
              w={gifs.base64[0].w}
              isGif
            />
          )}
          {((gifs.base64.length > 0 && stub.isGif) || (stub.jpgStub && !stub.isGif)) && (
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
          )}
        </div>
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
