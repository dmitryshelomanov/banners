import React, { Component } from 'react'
import styled from 'styled-components'
import { 
  Text,
  FlexWrap,
  Image,
} from '../'

const carouselItem = ({ className, url }) => (
  <FlexWrap 
    width="140px"
    height="146px"
    ai="center"
    jc="center"
    className={className}
  >
    <FlexWrap 
      className="percent"
      width="100%"
      height="100%"
      ai="center"
      jc="center"
    >
      -50%
    </FlexWrap>
    <FlexWrap 
      width="90%"
      height="90%"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'contain',
      }}
    />
  </FlexWrap>
)

export const CarouselItem = styled(carouselItem)`
  position: relative;
  background-color: #40A1A2;
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
`