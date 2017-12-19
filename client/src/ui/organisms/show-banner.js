import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  FlexWrap,
  Button,
  Caption,
} from '../'


class ShowBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: null,
    }
  }

  async componentWillMount() {
    try {
      const data = await axios.get(`http://localhost:8000/parse/banner?banner=${this.props.archive.name}`)

      this.setState({ html: `${data.data}` })
    }
    catch (error) {
      throw error
    }
  }

  bannerReady = () => {

  }

  render() {
    return (
      <div>
        {
          !this.state.html !== <FlexWrap
            width="100%"
            fd="column"
          >
            <Caption>
              Итоговый баннер
            </Caption>
            <Button
              text="перезагрузить"
              onClick={this.reloadBanner}
            />
            <FlexWrap
              width="100%"
              jc="space-around"
            >
              <iframe
                title="banner"
                onLoad={this.bannerReady}
                srcDoc={`${this.state.html}`}
                width="100%"
                height="500px"
                frameBorder="0"
                ref={(c) => {
                  this.banner = c
                }}
              />
            </FlexWrap>
          </FlexWrap>
        }
      </div>
    )
  }
}

export const ShowBannerWithArchive = connect(state => ({
  archive: state.archiveUpload.treeFolders,
}))(ShowBanner)
