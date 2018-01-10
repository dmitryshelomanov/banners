import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  setGifImage,
  setSize,
} from '../../redux/actions/gif'
import {
  FlexWrap,
  ControllWithHoc as Controll,
} from '../'
import { compressExt } from '../../config'

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
        BannerWrap
        <Controll />
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
