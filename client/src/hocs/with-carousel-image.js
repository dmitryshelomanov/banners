import React, { Component } from 'react'
import { connect } from 'react-redux'


export default WrapClass => { 
  class WithCarouselImage extends Component {
    render() {
      return (
        <WrapClass
          carousel={this.props.carousel}
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
