import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlexWrap,
  RangeVertical,
  InputText,
  Text
} from '../'
import { api } from '../../helpers/api'
import {
  setGifData,
} from '../../redux/actions/gif'
import { compressExt } from '../../config'
import vg from '../../helpers/version-generated'

/* eslint-disable radix */
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

class GifChangeContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isError: false,
      image: null,
      quality: 100,
      delay: 200,
      info: {
        newSize: 0,
        originalSize: 0,
        percentCompress: 0,
      },
    }
    this.uploadBase64()
  }

  setGifData = () => {
    this.props.onSetGifData({
      ids: this.props.ids,
      path: this.state.image.path,
      delay: this.state.delay,
    })
  }

  uploadBase64 = async () => {
    const { carousel, ids, archiveName } = this.props

    try {
      const { data } = await api.uploadImageForGif({
        data: carousel.base64,
        nameFile: `${ids}.${compressExt}`,
        nameFolder: archiveName,
      })

      this.setState({
        image: data,
        isLoading: false,
        info: {
          ...this.state.info,
          originalSize: data.originalSize,
        },
      }, () => {
        this.setGifData()
      })
    }
    catch (error) {
      this.setState({ isError: true })
    }
  }

  compressImage = async (img, q) => {
    try {
      const { data } = await api.compressGifImage(img, q)

      this.setState({
        isLoading: false,
        info: data,
      })
    }
    catch (error) {
      throw error
    }
  }

  changeDelay = ({ target }) => {
    this.setState({ delay: parseInt(target.value) }, () => {
      this.setGifData()
    })
  }

  render() {
    const { className, gifH, gifW } = this.props
    const {
      defaultHeight,
      defaultWidth,
      isLoading,
      image,
      isError,
      quality,
      delay,
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
              width={`${gifW}px`}
              height={`${gifH}px`}
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
            <ImageWrap
              fd="column"
            >
              <img
                width={`${defaultWidth}px`}
                height={`${defaultHeight}px`}
                src={`http://localhost:8000/gif/${image.url}?v${vg()}`}
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
              <InputText
                value={delay}
                onChange={this.changeDelay}
              />
              <Text>Новый размер - {this.state.info.newSize}</Text>
              <Text>Оригинальный размер - {this.state.info.originalSize}</Text>
              <Text>Процент сжатия - {this.state.info.percentCompress}</Text>
            </ImageWrap>
          )
        }
      </FlexWrap>
    )
  }
}

const GifChangeContainerWithArchive = connect(
  state => ({
    archiveName: state.archiveUpload.treeFolders.name,
    gifH: state.gifs.h,
    gifW: state.gifs.w,
  }),
  dispatch => ({
    onSetGifData: (data) => {
      dispatch(setGifData(data))
    },
  }),
)(GifChangeContainer)

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
