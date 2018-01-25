import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setSize,
  setBorderFromCanvas,
} from '../../redux/gif/actions'
import { togglePlayerReady } from '../../redux/banner/actions'
import {
  FlexWrap,
  ControllWithHoc as Controll,
} from '../'
import createStyle from '../../helpers/create-style'


/* eslint-disable  react/no-unused-state */
/* eslint-disable  no-underscore-dangle */
const BnnerWrap = FlexWrap.extend`
  background: #fff;
  margin: 25px 0;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
  min-height: 350px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
`

class ShowBanner extends Component {
  state = {
    html: null,
    s: null,
  }

  getInitialState = () => {
    if (!this.banner) return
    try {
      const doc = this.banner.contentDocument || this.banner.contentWindow.document
      const canvas = doc.getElementById('canvas')

      setTimeout(() => {
        const inst = this.banner.contentWindow.window.exportRoot.instance
          || this.banner.contentWindow.window.exportRoot.main

        this.props.onSetGifSize({ w: canvas.width, h: canvas.height })
        inst.gotoAndStop(1)
        this.props.togglePlayerState(true)
        this.setVariables(
          this.banner.contentWindow.window.createjs,
          this.banner.contentWindow.window.exportRoot,
          canvas.width,
          canvas.height,
        )
      }, 1000)
    }
    catch (error) {
      throw error
    }
  }

  componentDidMount() {
    try {
      this.getData()
    }
    catch (error) {
      throw error
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.bodyColor !== this.props.bodyColor) {
      createStyle(
        this.banner.contentDocument || this.banner.contentWindow.document,
        nextProps.bodyColor,
      )
    }
    if (nextProps.borderColor !== this.props.borderColor
    || nextProps.borderSize !== this.props.borderSize) {
      this.removeOldBorder()
      this.props.onSetBorder({
        nameFile: this.props.nameHtml,
        nameFolder: this.props.nameFolder,
        color: nextProps.borderColor,
        w: this.props.gifW,
        h: this.props.gifH,
        s: this.props.borderSize,
      })

      this.state.s.graphics._oldStrokeStyle.width = this.props.borderSize
    }
  }

  setPoweredState = (ctx, shape) => {
    shape.strokeCmd.style = this.props.borderColor
  }

  setVariables = (createjs, exportRoot, w, h) => {
    this.setState({
      s: new createjs.Shape(),
    }, () => {
      this.state.s.graphics.append({ exec: this.setPoweredState })
      this.state.s.strokeCmd = this.state.s.graphics.beginStroke('transparent').command
      this.state.s.graphics.setStrokeStyle(2).drawRect(0, 0, w, h)
      exportRoot.addChild(this.state.s)
    })
  }

  getData = async () => {
    const data = await axios.get(`http://localhost:8000/api/parse/banner?banner=${this.props.nameFolder}&file=${this.props.nameHtml}`)

    this.setState({ html: `${data.data}` })
  }

  getComputedSize = () => {
    const { resize, gifW } = this.props
    const { isFixed, minimalW, minimalH } = resize

    if (isFixed || Number(minimalW) === 0) {
      if (this.state.s !== null && this.state.s.graphics.command) {
        this.state.s.graphics.command.w = gifW
      }
      return { h: '100%', w: '100%' }
    }
    this.state.s.graphics.command.w = minimalW
    return { h: `${Number(minimalH) + 2}px`, w: `${Number(minimalW) + 2}px` }
  }

  removeOldBorder = () => {
    const wnd = this.banner.contentWindow.window
    const { exportRoot } = wnd

    if (typeof wnd.s !== 'undefined') {
      exportRoot.removeChild(wnd.s)
    }
  }

  render() {
    const { gifH, playerReady } = this.props
    const { h, w } = this.getComputedSize()

    return (
      <BnnerWrap
        w="100%"
        h={`${gifH + 150}px`}
        fd="column"
        jc="center"
        ai="center"
      >
        <iframe
          id="bannerFrame"
          title="banner"
          onLoad={this.getInitialState}
          srcDoc={this.state.html}
          // src={`http://localhost:8000/process/${this.props.nameFolder}/${this.props.nameHtml}`}
          width={w}
          height={h}
          frameBorder="0"
          ref={(c) => {
            this.banner = c
          }}
        />
        {playerReady && (
          <Controll
            instance={this.banner.contentWindow.window.exportRoot.instance
              || this.banner.contentWindow.window.exportRoot.main}
            exportRoot={this.banner.contentWindow.window.exportRoot}
            createjs={this.banner.contentWindow.window.createjs}
            wnd={this.banner.contentWindow.window}
          />
        )}
      </BnnerWrap>
    )
  }
}

export const ShowBannerWithArchive = connect(
  state => ({
    nameFolder: state.archiveUpload.treeFolders.name,
    nameHtml: state.archiveUpload.nameHtml,
    gifH: state.gifs.h,
    gifW: state.gifs.w,
    playerReady: state.player.playerReady,
    bodyColor: state.player.bodyColor,
    borderSize: state.player.borderSize,
    borderColor: state.player.borderColor,
    resize: state.resize,
  }),
  dispatch => ({
    onSetGifSize: (size) => {
      dispatch(setSize(size))
    },
    togglePlayerState(state) {
      dispatch(togglePlayerReady(state))
    },
    onSetBorder: (data) => {
      dispatch(setBorderFromCanvas(data))
    },
  }),
)(ShowBanner)
