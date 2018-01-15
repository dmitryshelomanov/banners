import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setSize,
  setBorderFromCanvas,
} from '../../redux/actions/gif'
import { togglePlayerReady } from '../../redux/actions/banner'
import {
  FlexWrap,
  ControllWithHoc as Controll,
} from '../'
import createStyle from '../../helpers/create-style'


/* eslint-disable  react/no-unused-state */
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

      this.props.onSetGifSize({ w: canvas.width, h: canvas.height })
      setTimeout(() => {
        const inst = this.banner.contentWindow.window.exportRoot.instance
          || this.banner.contentWindow.window.exportRoot.main

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
    if (nextProps.nameHtml !== this.props.nameHtml && this.banner) {
      this.reloadBanner()
    }
    if (nextProps.bodyColor !== this.props.bodyColor) {
      createStyle(
        this.banner.contentDocument || this.banner.contentWindow.document,
        nextProps.bodyColor,
      )
    }
    if (nextProps.borderColor !== this.props.borderColor) {
      this.removeOldBorder()
      this.props.onSetBorder({
        nameFile: this.props.nameHtml,
        nameFolder: this.props.nameFolder,
        color: nextProps.borderColor,
      })
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
    const data = await axios.get(`http://localhost:8000/parse/banner?banner=${this.props.nameFolder}&file=${this.props.nameHtml}`)

    this.setState({ html: `${data.data}` })
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

    return (
      <BnnerWrap
        width="100%"
        height={`${gifH + 80}px`}
        fd="column"
      >
        <iframe
          id="bannerFrame"
          title="banner"
          onLoad={this.getInitialState}
          srcDoc={this.state.html}
          // src={`http://localhost:8000/process/${this.props.nameFolder}/${this.props.nameHtml}`}
          width="100%"
          height="500px"
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
    playerReady: state.player.playerReady,
    bodyColor: state.player.bodyColor,
    borderColor: state.player.borderColor,
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
