import React, { PureComponent, Component } from 'react'
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
} from '../../redux/gif/actions'
import { compressExt, baseURL } from '../../config'
import ImageCache from '../../helpers/image-cache'
import updateSystem from '../../helpers/update-system'
import closeIcon from '../../assets/img/close.png'


class GifChangeContainer extends Component {
  changeDelay = (value) => {
    this.props.updateData({ delay: Number(value) })
  }

  changeRange = (value) => {
    this.props.updateData({ quality: Number(value) })
  }

  render() {
    const {
      data, unsetData: dropData,
      updateData, archiveName,
      className, ids,
      compressImage,
    } = this.props

    return (
      <div className={className}>
        <FlexWrap
          fd="column"
        >
          <img
            alt="close"
            src={closeIcon}
            className="closeIcon"
            onClick={dropData}
          />
          <div
            className="image-wrap"
          >
            <img
              src={`${baseURL}gif/${archiveName}/${data.name}?v${Math.random()}`}
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
                value={data.quality}
                onChangeComplete={async (value) => {
                  const res = await compressImage({
                    replacer: 'gif-original',
                    type: 'gif',
                    quality: Number(value),
                    name: data.name,
                    path: data.path,
                    originalSize: data.originalSize,
                  })

                  updateData({
                    info: {
                      percentCompress: res.percentCompress,
                      newSize: res.newSize,
                    },
                  })
                }}
                onChange={this.changeRange}
                orientation="vertical"
              />
              <Text>
                {data.info.percentCompress}% ({updateSystem(data.info.newSize)})
              </Text>
            </FlexWrap>
            <InputNumber
              value={data.delay}
              onChange={this.changeDelay}
            />
          </div>
        </FlexWrap>
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

export const GifItem = styled(GifChangeContainer)`
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
