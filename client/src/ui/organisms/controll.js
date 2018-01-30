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
import Emitter from '../../helpers/emitter'
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
      duration: props.instance.timeline.duration,
      isPlay: false,
    }
    this.emitter = Emitter.getInstance()
    this.registerEvent()
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

  getComputedValue = (value) => {
    const { fps } = this.props

    return `${Number.parseInt((value / fps) * 1000)}мc`
  }

  getComputedPecent = (value) => (value * 100) / this.state.duration

  getElements = () => {
    const el = this.timelineRange.node.querySelector('.input-range__track--active')
    const labelContainer = this.timelineRange.node.querySelector('.input-range__slider-container')
    const label = labelContainer.querySelector('.input-range__label-container')

    return { el, labelContainer, label }
  }

  setInfoFromTimeline = () => {
    const { instance } = this.props
    const { el, label, labelContainer } = this.getElements()

    el.style.width = `${this.getComputedPecent(instance.timeline.position)}%`
    labelContainer.style.left = `${this.getComputedPecent(instance.timeline.position)}%`
    label.innerText = this.getComputedValue(instance.timeline.position)
    instance.gotoAndStop(instance.timeline.position)
  }

  animated = () => {
    const { instance } = this.props

    if (!this.state.isPlay
      || instance.timeline.position > this.state.duration) return

    instance.timeline.position++
    this.setInfoFromTimeline()
    requestAnimationFrame(this.animated)
  }

  changeTimeLine = (value) => {
    const { instance } = this.props

    instance.timeline.position = value
    this.setInfoFromTimeline()
    instance.gotoAndStop(value)
  }

  registerEvent = () => {
    this.emitter.on('get:time:data', () => ({
      duration: this.state.duration,
      time: this.props.instance.timeline.position,
    }))
  }

  render() {
    const { duration, isPlay } = this.state
    const {
      gifSize,
      resize,
      onGetMinimalSize,
      nameFolder,
      nameFile,
      instance,
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
            onClick={() => {
              this.setState({ isPlay: true })
              requestAnimationFrame(this.animated)
            }}
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
          ref={(c) => {
            this.timelineRange = c
          }}
          formatLabel={value => this.getComputedValue(value)}
          maxValue={duration}
          minValue={1}
          value={instance.timeline.position}
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
