import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  setGifData,
  unsetData,
  updateGifData,
} from '../redux/actions/gif'
import { api } from '../helpers/api'
import { compressExt } from '../config'
import * as types from '../redux/types'


export default (WrapClass) => {
  class WithGifChangeContainer extends PureComponent {
    state = {
      isLoading: true,
    }

    componentWillMount = () => {
      this.hoockUploadBase64()
    }

  compressImage = async (img, q) => {
    try {
      this.setState({ isLoading: true })
      const { data } = await api.compressGifImage(img, q)

      this.setState({ isLoading: false })
      return data
    }
    catch (error) {
      throw error
    }
  }

    hoockUploadBase64 = async () => {
      const { carousel, archiveName, onUpdateData } = this.props

      if (!carousel.path) {
        const { data } = await api.uploadImageForGif({
          data: carousel.base64,
          nameFile: `${carousel.ids}.${compressExt}`,
          nameFolder: archiveName,
        })

        onUpdateData(carousel.ids, {
          ...data,
          base64: null,
          delay: 200,
          quality: 100,
          info: {
            percentCompress: 0,
            newSize: 0,
          },
        })
      }
      this.setState({ isLoading: false })
    }

    render() {
      const {
        onUnsetData, onUpdateData,
        carousel, archiveName,
        gifH, gifW,
        className,
      } = this.props

      return (
        <div className={className}>
          {this.state.isLoading && (
            <div
              className="preloader"
            />
          )}
          {this.state.isLoading || (
            <WrapClass
              ids={carousel.ids}
              gifH={gifH}
              gifW={gifW}
              data={carousel}
              archiveName={archiveName}
              unsetData={() => onUnsetData(carousel.ids)}
              updateData={data => onUpdateData(carousel.ids, data)}
              compressImage={this.compressImage}
            />
          )}
        </div>
      )
    }
  }

  const WithStyle = styled(WithGifChangeContainer)`
    & .preloader {
      width: ${props => props.gifW}px;
      height: ${props => props.gifH}px;
      background: #fff url(${({ theme }) => theme.preloader}) center center no-repeat;
    }
  `

  return connect(
    state => ({
      archiveName: state.archiveUpload.treeFolders.name,
      gifH: state.gifs.h,
      gifW: state.gifs.w,
      data: state.gifs.data,
    }),
    dispatch => ({
      onSetGifData: (data) => {
        dispatch(setGifData(data))
      },
      onUnsetData: (ids) => {
        dispatch(unsetData(ids))
      },
      onUpdateData: (ids, data) => {
        dispatch(updateGifData(ids, data))
      },
    }),
  )(WithStyle)
}
