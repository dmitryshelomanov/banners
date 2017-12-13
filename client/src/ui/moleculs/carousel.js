import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { 
  Text,
  FlexWrap,
  Image,
  CarouselItem
} from '../'


const CarouselWrap = FlexWrap.extend`
  width: 100%;
  overflow: hidden;
  transition: all .5s;
  border-top: 2px solid #47A4A5;
  border-bottom: 2px solid #47A4A5;
  background-color: #F0FAFA;
  padding: 15px;
  box-sizing: border-box;
`

export class Carousel extends Component {
  render() {
    const { images } = this.props.carousel
    return (
      <CarouselWrap
        style={{
          visibility: images.length > 0 ? 'visible' : 'hidden'
        }}
      >
        {
          images && images.map((item, key) => (
            <CarouselItem
              key={key}  
              url={`http://localhost:8000/${item.url}`}
            />
          ))
        }
      </CarouselWrap>
    )
  }
}
