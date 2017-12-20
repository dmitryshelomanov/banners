import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FlexWrap,
} from '../'


class GifChangeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      defaultWidth: 0,
      defaultHeight: 0,
    }
    this.image = new Image()
    this.image.src = props.carousel.base64
    this.image.onload = () => {
      const { w, h } = this.calculatePreloader()

      this.state.defaultHeight = h
      this.state.defaultWidth = w
    }
  }

  calculatePreloader = () => ({
    w: this.image.width,
    h: this.image.height,
  })

  uploadBase64 = () => {
    if (this.state.isLoading) return false
    return true
  }

  render() {
    const { carousel, width, className } = this.props

    return (
      <FlexWrap
        width={width}
        className={className}
      >
        <img
          alt="base64"
          src={carousel.base64}
        />
      </FlexWrap>
    )
  }
}

GifChangeContainer.propTypes = {
  carousel: PropTypes.shape({
    w: PropTypes.number,
    base64: PropTypes.string,
  }).isRequired,
  width: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export const GifItem = styled(GifChangeContainer)`
  margin-right: 15px;
`
