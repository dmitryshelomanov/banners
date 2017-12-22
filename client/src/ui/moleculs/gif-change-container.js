import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlexWrap,
  RangeVertical,
} from '../'
import { api } from '../../helpers/api'

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }

`

const ImageWrap = styled.div`
  opacity: 0;
  animation: ${fade} 1s forwards;
`

class GifChangeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isError: false,
      defaultWidth: 0,
      defaultHeight: 0,
      image: null,
      quality: 100,
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
        nameFile: `${ids}.jpg`,
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

  compressImage = async (img, q) => {
    try {
      await api.compressGifImage(img, q)
      this.setState({ isLoading: false })
    }
    catch (error) {
      throw error
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
      quality,
    } = this.state

    return (
      <FlexWrap
        className={className}
        ai="center"
        jc="center"
      >
        {
          isLoading && (
            <FlexWrap
              width={`${defaultWidth}px`}
              height={`${defaultHeight}px`}
              ai="center"
              jc="center"
            >
              <img
                className="preloader"
                src="https://www.oraclefitness.com/uploads/8/5/5/6/85569856/39_4_orig.gif"
                alt="preloader"
              />
            </FlexWrap>
          )
        }
        {
          !isLoading && (
            <ImageWrap>
              <img
                width={`${defaultWidth}px`}
                height={`${defaultHeight}px`}
                src={`http://localhost:8000/gif/${image.url}?v${Math.random()}`}
                alt="img"
              />
              <RangeVertical
                min={0}
                step={1}
                max={100}
                value={quality}
                onChange={() => {
                  this.setState({ quality: this.range.value })
                }}
                innerRef={(comp) => {
                  this.range = comp
                }}
                onMouseUp={() => {
                  this.setState({ isLoading: true })
                  this.compressImage(image, this.range.value)
                }}
              />
            </ImageWrap>
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
