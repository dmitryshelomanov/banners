import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  FlexWrap,
} from '../'
import { baseURL } from '../../config'
import updateSystem from '../../helpers/update-system'

/* eslint-disable no-magic-numbers */

const Wrapper = FlexWrap.extend`
  display: flex;
  flex-direction: column;
  width: 43%;
  & .info {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 15px 0;
  }
  & .image-wrapper {
    display: block;
    overflow: hidden;
    border: none;
    background: #FFFFFF url(http://optimizilla.com/images/grid3x.png) repeat;
    position: relative;
    cursor: move;
    width: 100%;
    height: 350px;
    & img {
      position: relative;
      display: block;
      margin: 0 auto
    }
  }
`

class ImageWrap extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.carousel.activeImage !== nextProps.carousel.activeImage) this.img.removeAttribute('style')
  }

  render() {
    const { carousel, isOrigin, nestedRef, dispatch, ...rest } = this.props

    const folder = isOrigin ? 'decompress' : 'process'
    const v = Math.floor(Math.random() * 2000)
    const imageActive = carousel.images[carousel.activeImage]

    return (
      <Wrapper>
        <div className="info">
          {isOrigin && imageActive.info && `Исходный ( ${updateSystem(imageActive.info.originalSize)} )`}
          {!isOrigin && imageActive.info && `Сжатый ( ${updateSystem(imageActive.info.newSize)} )`}
        </div>
        <div
          className="image-wrapper"
          ref={nestedRef && nestedRef}
          draggable={false}
          {...rest}
        >
          <img
            alt="img"
            ref={(c) => {
              this.img = c
            }}
            src={`${baseURL}${folder}/${imageActive.url}?v=${v}`}
            draggable={false}
          />
        </div>
      </Wrapper>
    )
  }
}

ImageWrap.propTypes = {
  className: PropTypes.string.isRequired,
  isOrigin: PropTypes.bool.isRequired,
  nestedRef: PropTypes.oneOfType([
    PropTypes.func,
  ]),
  carousel: PropTypes.shape({
    activeImage: PropTypes.number,
    images: PropTypes.array,
  }).isRequired,
}

ImageWrap.defaultProps = {
  nestedRef: () => { },
}

export const ImageReview = connect(state => ({
  carousel: state.carousel,
}))(ImageWrap)
