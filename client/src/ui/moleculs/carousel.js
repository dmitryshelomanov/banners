import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { 
  Text,
  FlexWrap,
  Image,
  ChangeImage
} from '../'
import { CarouselItem } from './carousel-item'
import WithActiveImage from '../../hocs/with-active-image'


const CarouselWrap = FlexWrap.extend`
  width: 100%;
  overflow: hidden;
  transition: all .5s;
  border-top: 2px solid #47A4A5;
  background-color: #F0FAFA;
  padding: 15px;
  box-sizing: border-box;
`

const CarouselItemHoc = WithActiveImage(CarouselItem)

export class Carousel extends Component {
  render() {
    const { images } = this.props.carousel
    return (
      <FlexWrap
        fd="column"
        width="100%"
        style={{
          visibility: images.length > 0 ? 'visible' : 'hidden'
        }}
      >
        <CarouselWrap>
          {
            images.length > 0 && images.map((item, key) => (
              <CarouselItemHoc
                key={key}
                ids={key}
              />
            ))
          }
        </CarouselWrap>
        <ChangeImage />
      </FlexWrap>
    )
  }
}
