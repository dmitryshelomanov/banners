import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  RangeVertical,
  FlexWrap,
  Text,
  ColorPicker,
} from '../'
import createStyle from '../../helpers/create-style'
import { setBorderFromCanvas } from '../../redux/actions/gif'

/* eslint-disable  radix */
export class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isPlay: true,
      background: 'transparent',
      duration: props.banner.timeline.duration,
      s: null,
      borderPicker: false,
      bodyPicker: false,
    }
    this.playStart()
  }

  componentDidMount() {
    try {
      this.setVariables()
    }
    catch (error) {
      throw error
    }
  }

  setPoweredState = (ctx, shape) => {
    shape.strokeCmd.style = this.state.background
  }

  setVariables = () => {
    const { createjs, exportRoot, w, h } = this.props

    this.setState({
      s: new createjs.Shape(),
    }, () => {
      this.state.s.graphics.append({ exec: this.setPoweredState })
      this.state.s.strokeCmd = this.state.s.graphics.beginStroke('transparent').command
      this.state.s.graphics.setStrokeStyle(1).drawRect(0, 0, w, h)
      exportRoot.addChild(this.state.s)
    })
  }

  removeBorder = () => {
    this.setState({ background: 'transparent' })
  }

  changeTimeLine = ({ target }) => {
    this.setState({ step: target.value }, () => {
      const { banner } = this.props

      banner.gotoAndStop(this.state.step)
    })
  }

  play = () => {
    this.setState({ isPlay: true })
  }

  playStart = () => {
    const { banner, lib } = this.props
    const { fps } = lib.properties

    setInterval(() => {
      if (!this.state.isPlay
        || this.state.step > this.state.duration) return

      this.setState({ step: parseInt(this.state.step) + 1 }, () => {
        banner.gotoAndStop(this.state.step)
      })
    }, fps)
  }

  stop = () => {
    this.setState({ isPlay: false })
  }

  removeOldBorder = () => {
    const { wnd, exportRoot, onSetBorder } = this.props

    if (typeof wnd.s !== 'undefined') {
      exportRoot.removeChild(wnd.s)
    }
  }

  render() {
    const { step } = this.state
    const { doc, onSetBorder, nameFolder, nameFile } = this.props

    return (
      <FlexWrap
        width="100%"
        fd="column"
      >
        <RangeVertical
          value={step}
          min={1}
          max={this.state.duration}
          onChange={this.changeTimeLine}
          width="100%"
        />
        <Text onClick={this.play}>play</Text>
        <Text onClick={this.stop}>stop</Text>
        <Text
          onClick={() => {
            this.setState({ borderPicker: !this.state.borderPicker })
          }}
        >
          add border
        </Text>
        <Text
          onClick={() => {
            this.removeOldBorder()
            this.setState({ background: 'transparent' })
            onSetBorder({ nameFolder, nameFile, color: 'transparent' })
          }}
        >
          remove border
        </Text>
        {this.state.borderPicker && (
          <ColorPicker
            color={this.state.background}
            onChangeComplete={(color) => {
              this.removeOldBorder()
              this.setState({ background: color.hex })
              onSetBorder({ nameFolder, nameFile, color: color.hex })
            }}
          />
        )}
        <Text
          onClick={() => {
            this.setState({ bodyPicker: !this.state.bodyPicker })
          }}
        >
          body color change
        </Text>
        {this.state.bodyPicker && (
          <ColorPicker
            onChangeComplete={(color) => {
              createStyle(doc, color.hex)
            }}
          />
        )}
      </FlexWrap>
    )
  }
}

export const PlayerWithHoc = connect(
  state => ({
    w: state.gifs.w,
    h: state.gifs.h,
    nameFolder: state.archiveUpload.treeFolders.name,
    nameFile: state.archiveUpload.nameHtml,
  }),
  dispatch => ({
    onSetBorder: (data) => {
      dispatch(setBorderFromCanvas(data))
    },
  }),
)(Player)
