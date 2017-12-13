import React, { Component } from 'react'
import {
  FlexWrap,
  Text,
  Carousel
} from '../'
import WithCarouselImg from '../../hocs/with-carousel-image'


const WithCarouselImgHoc = WithCarouselImg(Carousel)

export class CompressImage extends Component {
  render() {
    return (
      <FlexWrap
        width="100%"
      >
        <WithCarouselImgHoc />
      </FlexWrap>
    )
  }
}
