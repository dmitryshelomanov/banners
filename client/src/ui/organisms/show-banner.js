import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setSize,
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
  constructor(props) {
    super(props)
    this.state = {
      html: null,
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
        this.props.togglePlayerState(true)
      }, 1000)
    }
    catch (error) {
      throw error
    }
  }

  componentDidMount() {
    this.getData()
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
  }

  getData = async () => {
    const data = await axios.get(`http://localhost:8000/parse/banner?banner=${this.props.archive.name}`)

    this.setState({ html: `${data.data}` })
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
          width="100%"
          height="500px"
          frameBorder="0"
          ref={(c) => {
            this.banner = c
          }}
        />
        {playerReady && (
          <Controll
            instance={this.banner.contentWindow.window.exportRoot.instance}
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
    archive: state.archiveUpload.treeFolders,
    nameHtml: state.archiveUpload.nameHtml,
    gifH: state.gifs.h,
    playerReady: state.player.playerReady,
    bodyColor: state.player.bodyColor,
  }),
  dispatch => ({
    onSetGifSize: (size) => {
      dispatch(setSize(size))
    },
    togglePlayerState(state) {
      dispatch(togglePlayerReady(state))
    },
  }),
)(ShowBanner)
