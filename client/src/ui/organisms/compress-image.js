import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
  Text,
  Carousel,
  CarouselItem
} from '../'
import WithActiveImage from '../../hocs/with-active-image'


const ItemWithActive = WithActiveImage(CarouselItem)

class CompressImageWrap extends Component {
  render() {
    return (
      <FlexWrap
        width="100%"
      >
        <Carousel
          component={<ItemWithActive />}
          carousel={this.props.carousel}
        />
      </FlexWrap>
    )
  }
}

export const CompressImage = connect(
  state => ({
    carousel: state.carousel
  })
)(CompressImageWrap)
