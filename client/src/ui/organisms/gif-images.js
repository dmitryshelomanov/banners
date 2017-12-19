import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  FlexWrap,
  GifItem,
  Carousel,
} from '../'

/* eslint-disable react/no-array-index-key */

const GifWrapper = ({ gifs }) => (
  <FlexWrap
    width="100%"
  >
    {
      gifs.data.length > 0 && (
        <Carousel
          component={<GifItem />}
          carousel={gifs.data}
          width={gifs.data[0].w}
        />
      )
    }
  </FlexWrap>
)

const GifWithStyled = styled(GifWrapper)`

`

export const GifImages = connect(state => ({
  gifs: state.gifs,
}))(GifWithStyled)
