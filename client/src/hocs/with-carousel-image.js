import React, { Component } from 'react'
import { connect } from 'react-redux'


export default WrapClass => { 
  class WithCarouselImage extends Component {
    render() {
      const { carousel, ...rest } = this.props
      return (
        <WrapClass
          carousel={carousel}
          {...rest}
        />
      )
    }
  }
  return connect(
    state => ({
      carousel: state.carousel
    })
  )(WithCarouselImage)
}
