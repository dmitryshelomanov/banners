import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputRange from 'react-input-range'
import {
  FlexWrap,
} from '../'
import { setBorderFromCanvas, setGifImage } from '../../redux/gif/actions'
import { setJpgStub } from '../../redux/stub/actions'
import { getMinimalSize } from '../../redux/resize/actions'
import { getGifSize } from '../../redux/gif/selectors'
import { getResize } from '../../redux/resize/selectors'
import { getStub } from '../../redux/stub/selectors'
import { getPlayerFps } from '../../redux/banner/selectors'
import {
  getArchiveName,
  getArchiveFileName,
} from '../../redux/tree-folder/selectors'
import playIcon from '../../assets/img/play.png'
import pauseIcon from '../../assets/img/pause.png'
import getBanner from '../../helpers/get-banner'
import { compressExt } from '../../config'
/* eslint-disable  radix */

const ControllWrapp = FlexWrap.extend`
  border-radius: 0 0 5px 5px;
  background: ${({ theme }) => theme.color.color5};
  align-items: center;
  height: 90px;
  & img {
    margin: 0 35px;
    cursor: pointer;
  } & .set-screen {
    display: flex;
    width: 140px;
    height: 100%;
    background: ${({ theme }) => theme.color.color2};
    margin-left: 40px;
    align-items: center;
    cursor: pointer;
    text-align: center;
    color: ${({ theme }) => theme.color.color11};
    padding: 0 15px;
  } & .minimal-width {
    margin-left: 0;
    background: ${({ theme }) => theme.color.color1};
    color: ${({ theme }) => theme.color.color4};
  }
`

class Controll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      duration: props.instance.timeline.duration,
      isPlay: false,
    }
    this.playStart()
  }

  getMethodFromStub = () => {
    const { stub, setImageFromGif, gifSize, onSetStub } = this.props

    if (stub.isGif) {
      return setImageFromGif(
        getBanner(true).canvas.toDataURL(`image/${compressExt}`, 1),
        gifSize.gifW,
      )
    }
    return onSetStub(getBanner(true).canvas.toDataURL('image/jpeg', 0.6))
  }

  playStart = () => {
    const { instance } = this.props

    setInterval(() => {
      if (!this.state.isPlay
        || this.state.step > this.state.duration) return

      this.setState({ step: parseInt(this.state.step) + 1 }, () => {
        instance.gotoAndStop(this.state.step)
      })
    }, 30)
  }

  changeTimeLine = (value) => {
    this.setState({ step: value }, () => {
      const { instance } = this.props

      instance.gotoAndStop(this.state.step)
    })
  }

  render() {
    const { duration, isPlay } = this.state
    const {
      gifSize,
      resize,
      onGetMinimalSize,
      nameFolder,
      nameFile,
      fps,
    } = this.props

    return (
      <ControllWrapp
        className="controllrange"
        w="100%"
      >
        {!isPlay && (
          <img
            alt="play"
            src={playIcon}
            onClick={() => this.setState({ isPlay: true })}
          />
        )}
        {isPlay && (
          <img
            alt="repat"
            src={pauseIcon}
            onClick={() => this.setState({ isPlay: false })}
          />
        )}
        <InputRange
          formatLabel={value => `${Number.parseInt((value / fps) * 1000)}мc`}
          maxValue={duration}
          minValue={1}
          value={this.state.step}
          onChange={this.changeTimeLine}
        />
        <div
          role="button"
          className="set-screen"
          onClick={() => {
            this.getMethodFromStub()
          }}
        >
          Заскринить кадр
        </div>
        {!resize.isFixed && (
          <div
            role="button"
            className="set-screen minimal-width"
            onClick={() => {
              onGetMinimalSize(nameFolder, nameFile)
            }}
          >
            минимальная ширина
          </div>
        )}
      </ControllWrapp>
    )
  }
}

const mapStateToProps = (state, props) => ({
  gifSize: getGifSize(state, props),
  nameFolder: getArchiveName(state, props),
  nameFile: getArchiveFileName(state, props),
  resize: getResize(state, props),
  stub: getStub(state, props),
  fps: getPlayerFps(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSetBorder: (data) => {
    dispatch(setBorderFromCanvas(data))
  },
  setImageFromGif: (base64, w) => {
    dispatch(setGifImage(base64, w))
  },
  onSetStub: (base64) => {
    dispatch(setJpgStub(base64))
  },
  onGetMinimalSize: (nameFolder, nameFile) => {
    dispatch(getMinimalSize(nameFolder, nameFile))
  },
})


export const ControllWithHoc = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controll)
