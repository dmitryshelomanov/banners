import React, { Component } from 'react'
import styled from 'styled-components'
import { 
  Text,
  FlexWrap,
} from '../'

const Image = FlexWrap.extend`
  background: url(${props => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const carouselItem = ({ 
  className, img, activeImage, ids, ...rest
}) => {
  return (
    <FlexWrap
      width="140px"
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
}

export const CarouselItem = styled(carouselItem)`
  position: relative;
  background-color: #FFF0ED;
  border-color: #888888;
  border-radius: 4px;
  margin-right: 15px;
  cursor: pointer;
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
    background: #40A1A2 !important
  }
`
