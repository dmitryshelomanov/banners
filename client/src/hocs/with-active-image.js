import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as types from '../redux/types'


export default WrapClass => { 
  class WithActiveImage extends Component {
    render() {
      const { ids, onSetActiveImage, carousel, ...rest } = this.props

      return (
        <WrapClass
          img={carousel.images[ids]}
          ids={ids}
          activeImage={carousel.activeImage}
          onClick={() => onSetActiveImage(ids)}
          {...rest}
        />
      )
    }
  }
  return connect(
    state => ({
      carousel: state.carousel
    }),
    dispatch => ({
      onSetActiveImage: ids => { 
        dispatch({ type: types.CAROUSEL_SET_ACTIVE_IMAGE, payload: ids })
      }
    })
  )(WithActiveImage)
}
