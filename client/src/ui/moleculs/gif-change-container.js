import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlexWrap,
} from '../'
import { api } from '../../helpers/api'


class GifChangeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isError: false,
      defaultWidth: 0,
      defaultHeight: 0,
      image: null,
    }
    this.image = new Image()
    this.image.src = props.carousel.base64
    this.image.onload = () => {
      const { w, h } = this.calculatePreloader()

      this.setState({
        defaultHeight: h,
        defaultWidth: w,
      })
    }
    this.uploadBase64()
  }

  calculatePreloader = () => ({
    w: this.image.width,
    h: this.image.height,
  })

  uploadBase64 = async () => {
    const { carousel, ids, archiveName } = this.props

    try {
      const { data } = await api.uploadImageForGif({
        data: carousel.base64,
        nameFile: `${archiveName}/${ids}`,
        nameFolder: archiveName,
      })

      this.setState({
        image: data,
        isLoading: false,
      })
    }
    catch (error) {
      this.setState({ isError: true })
    }
  }

  render() {
    const { className } = this.props
    const {
      defaultHeight,
      defaultWidth,
      isLoading,
      image,
      isError,
    } = this.state

    return (
      <FlexWrap
        width={`${defaultWidth}px`}
        height={`${defaultHeight}px`}
        className={className}
        ai="center"
        jc="center"
      >
        {
          isLoading && (
            <img
              className="preloader"
              src="https://www.oraclefitness.com/uploads/8/5/5/6/85569856/39_4_orig.gif"
              alt="preloader"
            />
          )
        }
        {
          !isLoading && (
            <img
              src={`http://localhost:8000/${image.url}`}
              alt="img"
            />
          )
        }
      </FlexWrap>
    )
  }
}

const GifChangeContainerWithArchive = connect(state => ({
  archiveName: state.archiveUpload.treeFolders.name,
}))(GifChangeContainer)

GifChangeContainer.propTypes = {
  carousel: PropTypes.shape({
    w: PropTypes.number,
    base64: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
}

export const GifItem = styled(GifChangeContainerWithArchive)`
  margin-right: 15px;
  background-color: #fff0ed;
`
