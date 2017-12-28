import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setGifImage,
  setSize,
} from '../../redux/actions/gif'
import {
  FlexWrap,
  Button,
  PlayerWithHoc,
} from '../'
import { compressExt } from '../../config'


const BnnerWrap = FlexWrap.extend`
  margin: 25px 0
`

class ShowBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: null,
      playerReady: false,
    }
  }

  getInitialState = () => {
    if (!this.banner) return
    try {
      const doc = this.banner.contentDocument || this.banner.contentWindow.document
      const canvas = doc.getElementById('canvas')

      this.props.onSetGifSize({ w: canvas.width, h: canvas.height })
      setTimeout(() => {
        this.banner.contentWindow.window.exportRoot.instance.gotoAndStop(1)
        this.setState({ playerReady: true })
      }, 1000)
    }
    catch (error) {
      throw error
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.nameHtml !== this.props.nameHtml && this.banner) {
      this.reloadBanner()
    }
    return true
  }

  getData = async () => {
    const data = await axios.get(`http://localhost:8000/parse/banner?banner=${this.props.archive.name}`)

    this.setState({ html: `${data.data}` })
  }

  getDataURL = () => {
    if (!this.banner) return
    const doc = this.banner.contentDocument || this.banner.contentWindow.document
    const canvas = doc.getElementById('canvas')

    this.props.setImageFromGif(canvas.toDataURL(`image/${compressExt}`, 1), canvas.width)
  }

  render() {
    return (
      <BnnerWrap
        width="100%"
        fd="column"
      >
        <FlexWrap>
          {(!this.state.html && this.props.archive.name) && (
            <Button
              text="посмотреть баннер"
              onClick={this.getData}
            />
          )}
        </FlexWrap>
        {
          (this.state.html && this.props.nameHtml) && (
            <FlexWrap
              width="100%"
              fd="column"
            >
              <FlexWrap
                width="100%"
                fd="column"
                ai="center"
              >
                <iframe
                  id="frame"
                  title="banner"
                  onLoad={this.getInitialState}
                  // src={`http://localhost:8000/process/${this.props.archive.name}/${this.props.nameHtml}`}
                  srcDoc={this.state.html}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  ref={(c) => {
                    this.banner = c
                  }}
                />
                {this.state.playerReady && (
                  <PlayerWithHoc
                    banner={this.banner.contentWindow.window.exportRoot.instance}
                    exportRoot={this.banner.contentWindow.window.exportRoot}
                    lib={this.banner.contentWindow.window.lib}
                    createjs={this.banner.contentWindow.window.createjs}
                    doc={this.banner.contentDocument || this.banner.contentWindow.document}
                    wnd={this.banner.contentWindow.window}
                  />
                )}
                <Button
                  text="взять картинку"
                  onClick={this.getDataURL}
                />
              </FlexWrap>
            </FlexWrap>
          )
        }
      </BnnerWrap>
    )
  }
}

export const ShowBannerWithArchive = connect(
  state => ({
    archive: state.archiveUpload.treeFolders,
    nameHtml: state.archiveUpload.nameHtml,
  }),
  dispatch => ({
    setImageFromGif: (base64, w) => {
      dispatch(setGifImage(base64, w))
    },
    onSetGifSize: (size) => {
      dispatch(setSize(size))
    },
  }),
)(ShowBanner)
