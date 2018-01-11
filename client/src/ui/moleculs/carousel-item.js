import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FlexWrap,
} from '../'


const Image = FlexWrap.extend`
  background: url(${props => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const carouselItem = ({
  className, img, activeImage, ids, width, ...rest
}) => (
  <FlexWrap
    width={width}
    height="146px"
    ai="center"
    jc="center"
    className={`${className} ${activeImage === ids && 'active'}`}
    {...rest}
  >
    <FlexWrap
      className="percent"
      width="100%"
      height="100%"
      ai="center"
      jc="center"
    >
      {img.info && `-${img.info.percentCompress}%`}
    </FlexWrap>
    <Image
      width="90%"
      height="90%"
      url={`http://localhost:8000/decompress/${img.url}`}
    />
  </FlexWrap>
)

carouselItem.propTypes = {
  className: PropTypes.string.isRequired,
  img: PropTypes.shape({
    url: PropTypes.string,
    info: PropTypes.object,
  }).isRequired,
  activeImage: PropTypes.number,
  ids: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
}

carouselItem.defaultProps = {
  activeImage: null,
}

export const CarouselItem = styled(carouselItem)`
  position: relative;
  background-color: #e3e3e3;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
  & .percent {
    position: absolute;
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    z-index: 50;
    opacity: 0.6;
    text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
  }
  &.active {
    background: #c8c8c8 !important
  }
`
