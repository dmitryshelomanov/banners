import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputNumber from 'rc-input-number'
import InputRange from 'react-input-range'
import {
  FlexWrap,
  Text,
} from '../'
import { api } from '../../helpers/api'
import {
  setGifData,
} from '../../redux/actions/gif'
import { compressExt } from '../../config'
import ImageCache from '../../helpers/image-cache'
import updateSystem from '../../helpers/update-system'

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
  padding: 40px 0;
  box-sizing: border-box;
  background-color: #e3e3e3;
  margin-bottom: 15px;
`

const Wrapper = FlexWrap.extend`
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`

const ControllWrap = FlexWrap.extend`
  width: 100%;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
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
    this.cache = new ImageCache()
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
      this.cache.update(`http://localhost:8000/gif/${img.url}`)
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

  changeDelay = (value) => {
    this.setState({ delay: parseInt(value) }, () => {
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
      <Wrapper>
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
            <FlexWrap
              fd="column"
            >
              <ImageWrap
                fd="column"
              >
                <img
                  width={`${defaultWidth}px`}
                  height={`${defaultHeight}px`}
                  src={this.cache.get(`http://localhost:8000/gif/${image.url}`)}
                  alt="img"
                />
              </ImageWrap>
              <ControllWrap
                className="gif-compress"
              >
                <FlexWrap
                  fd="column"
                  ai="center"
                >
                  <InputRange
                    minValue={0}
                    step={1}
                    maxValue={100}
                    value={quality}
                    onChangeComplete={(value) => {
                      this.setState({ isLoading: true })
                      this.compressImage(image, value)
                    }}
                    onChange={(value) => {
                      this.setState({ quality: value})
                    }}
                  />
                  <Text>
                    {this.state.info.percentCompress}% ({updateSystem(this.state.info.newSize)})
                  </Text>
                </FlexWrap>
                <InputNumber
                  value={delay}
                  onChange={(value) => {
                    this.changeDelay(value)
                  }}
                />
              </ControllWrap>
            </FlexWrap>
          )
        }
      </Wrapper>
    )
  }
}

export const GifItem = connect(
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
}
