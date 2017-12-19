import React from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
  Carousel,
  CarouselItem,
} from '../'
import WithActiveImage from '../../hocs/with-active-image'


const ItemWithActive = WithActiveImage(CarouselItem)

const CompressImageWrap = ({ carousel }) => (
  <FlexWrap
    width="100%"
  >
    <Carousel
      component={<ItemWithActive />}
      carousel={carousel}
    />
  </FlexWrap>
)

export const CompressImage = connect(state => ({
  carousel: state.carousel,
}))(CompressImageWrap)
