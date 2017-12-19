import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  FlexWrap,
} from '../'
import updateSystem from '../../helpers/update-system'

/* eslint-disable no-magic-numbers */

const InfoWithStyle = FlexWrap.extend`
  top: 0;
  left: 0;
  position: relative;
  background: #40a1a2;
  color: #fff;
  padding: 15px;
`

class ImageWrap extends Component {
  componentWillUpdate(nextProps) {
    if (this.props.carousel.activeImage !== nextProps.carousel.activeImage) this.img.removeAttribute('style')
  }

  render() {
    const { className, carousel, isOrigin, nestedRef } = this.props

    const folder = isOrigin ? 'decompress' : 'process'
    const v = Math.floor(Math.random() * 2000)
    const imageActive = carousel.images[carousel.activeImage]

    return (
      <FlexWrap
        fd="column"
        width="43%"
      >
        <InfoWithStyle
          className="info"
          width="100%"
        >
          {isOrigin && imageActive.info && `Исходный ( ${updateSystem(imageActive.info.originalSize)} )kb`}
          {!isOrigin && imageActive.info && `Сжатый ( ${updateSystem(imageActive.info.newSize)} )kb`}
        </InfoWithStyle>
        <div
          className={className}
          ref={nestedRef && nestedRef}
        >
          <img
            alt="img"
            ref={(c) => {
              this.img = c
            }}
            src={`http://localhost:8000/${folder}/${imageActive.url}?v=${v}`}
            draggable={false}
          />
        </div>
      </FlexWrap>
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

const withStyle = styled(ImageWrap)`
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
`

export const ImageReview = connect(state => ({
  carousel: state.carousel,
}))(withStyle)
