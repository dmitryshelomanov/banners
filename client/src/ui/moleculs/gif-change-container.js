import React, { Component } from 'react'
import styled from 'styled-components'
import {
  FlexWrap,
} from '../'


class GifChangeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

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

export const GifItem = styled(GifChangeContainer)`
  margin-right: 15px;
`
