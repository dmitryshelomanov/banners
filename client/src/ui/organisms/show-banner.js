import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import createStyle from '../../helpers/create-style'
import {
  setSize,
  setBorderFromCanvas,
  setGifImage,
} from '../../redux/gif/actions'
import {
  togglePlayerReady,
  setFps,
} from '../../redux/banner/actions'
import {
  setJpgStub,
} from '../../redux/stub/actions'
import {
  getPlayerBgColor,
  getPlayerBorderColor,
  getPlayerBorderSize,
  getPlayerReadyState,
  getPlayerFps,
} from '../../redux/banner/selectors'
import { getGifSize } from '../../redux/gif/selectors'
import {
  getArchiveName,
  getArchiveFileName,
} from '../../redux/tree-folder/selectors'
import { getResize } from '../../redux/resize/selectors'
import {
  FlexWrap,
  ControllWithHoc as Controll,
} from '../'
import { baseURL, compressExt } from '../../config'
import emitter from '../../helpers/emitter'
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
  constructor(props) {
    super(props)
    this.state = {
      html: null,
      s: null,
    }
    this.registerEmiterListeners()
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
        this.props.onSetFps(this.banner.contentWindow.lib.properties.fps)
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
        w: this.props.gifSize.gifW,
        h: this.props.gifSize.gifH,
        s: nextProps.borderSize,
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
    const { resize, gifSize } = this.props
    const { isFixed, minimalW, minimalH } = resize

    if (isFixed || Number(minimalW) === 0) {
      if (this.state.s !== null && this.state.s.graphics.command) {
        this.state.s.graphics.command.w = gifSize.gifW
      }
      return { h: '100%', w: '100%' }
    }
    this.state.s.graphics.command.w = minimalW
    return { h: `${Number(minimalH) + 2}px`, w: `${Number(minimalW) + 2}px` }
  }

  registerEmiterListeners = () => {
    emitter.on('set-stub-gif', (...rest) => {
      const doc = this.banner.contentDocument || this.banner.contentWindow.document
      const canvas = doc.getElementById('canvas')

      this.props.setImageFromGif(
        canvas.toDataURL(`image/${compressExt}`, 1),
        this.props.gifSize.gifW,
      )
    })
    emitter.on('set-stub-jpg', (q = 1) => {
      const doc = this.banner.contentDocument || this.banner.contentWindow.document
      const canvas = doc.getElementById('canvas')

      this.props.onSetStub(canvas.toDataURL('image/jpeg', q))
    })
  }

  removeOldBorder = () => {
    const wnd = this.banner.contentWindow.window
    const { exportRoot } = wnd

    if (typeof wnd.s !== 'undefined') {
      exportRoot.removeChild(wnd.s)
    }
  }

  render() {
    const { gifSize, playerReady } = this.props
    const { h, w } = this.getComputedSize()

    return (
      <BnnerWrap
        w="100%"
        h={`${gifSize.gifH + 150}px`}
        fd="column"
        jc="center"
        ai="center"
      >
        <iframe
          id="bannerFrame"
          title="banner"
          onLoad={this.getInitialState}
          srcDoc={this.state.html}
          // src={`${baseURL}/process/${this.props.nameFolder}/${this.props.nameHtml}`}
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

const mapStateToProps = (state, props) => ({
  nameFolder: getArchiveName(state, props),
  nameHtml: getArchiveFileName(state, props),
  gifSize: getGifSize(state, props),
  playerReady: getPlayerReadyState(state, props),
  bodyColor: getPlayerBgColor(state, props),
  borderSize: getPlayerBorderSize(state, props),
  borderColor: getPlayerBorderColor(state, props),
  resize: getResize(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  onSetGifSize: (size) => {
    dispatch(setSize(size))
  },
  togglePlayerState(state) {
    dispatch(togglePlayerReady(state))
  },
  onSetBorder: (data) => {
    dispatch(setBorderFromCanvas(data))
  },
  onSetFps: (fps) => {
    dispatch(setFps(fps))
  },
  setImageFromGif: (base64, w) => {
    dispatch(setGifImage(base64, w))
  },
  onSetStub: (base64) => {
    dispatch(setJpgStub(base64))
  },
})

export const ShowBannerWithArchive = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowBanner)
