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
  unsetData,
} from '../../redux/actions/gif'
import { compressExt } from '../../config'
import ImageCache from '../../helpers/image-cache'
import updateSystem from '../../helpers/update-system'
import closeIcon from '../../assets/img/close.png'

/* eslint-disable radix */
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
    const { carousel, archiveName, ids } = this.props

    try {
      const { data } = await api.uploadImageForGif({
        data: carousel.base64,
        nameFile: `${carousel.name}.${compressExt}`,
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
      this.cache.update(`http://localhost:8000/gif/${this.props.archiveName}/${this.props.carousel.name}.${compressExt}`)
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
    const { className, gifH, gifW, onUnsetData, carousel, ids, archiveName } = this.props
    const { isLoading, image, isError, quality, delay } = this.state

    return (
      <div className={className}>
        {
          isLoading && (
            <FlexWrap
              w={`${gifW}px`}
              h={`${gifH}px`}
              ai="center"
              jc="center"
            >
              <div
                className="preloader"
              />
            </FlexWrap>
          )
        }
        {
          !isLoading && (
            <FlexWrap
              fd="column"
            >
              <img
                alt="close"
                src={closeIcon}
                className="closeIcon"
                onClick={() => {
                  onUnsetData(ids)
                }}
              />
              <div
                className="image-wrap"
              >
                <img
                  src={this.cache.get(`http://localhost:8000/gif/${archiveName}/${carousel.name}.${compressExt}`)}
                  alt="img"
                />
              </div>
              <div
                className="gif-compress controll-wrap"
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
                    orientation="vertical"
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
              </div>
            </FlexWrap>
          )
        }
      </div>
    )
  }
}

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const GifItemWithStyle = styled(GifChangeContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  position: relative;
  & .image-wrap {
    opacity: 0;
    animation: ${fade} 1s forwards;
    padding: 40px 0;
    box-sizing: border-box;
    background-color: #e3e3e3;
    margin-bottom: 15px;
  }
  & .controll-wrap {
    display: flex;
    width: 100%;
    padding: 15px 0;
    align-items: center;
    justify-content: space-between;
  }
  & .closeIcon {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    margin: 5px;
    cursor: pointer;
  }
  & .preloader {
    width: 100%;
    height: 100%;
    background: #fff url(${({ theme }) => theme.preloader}) center center no-repeat;
  }
`

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
    onUnsetData: (ids) => {
      dispatch(unsetData(ids))
    },
  }),
)(GifItemWithStyle)

GifChangeContainer.propTypes = {
  carousel: PropTypes.shape({
    w: PropTypes.number,
    base64: PropTypes.string,
  }).isRequired,
}
