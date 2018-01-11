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
      gifs.base64.length > 0 && (
        <FlexWrap
          width="100%"
          fd="column"
        >
          <Carousel
            component={<GifItem />}
            carousel={gifs.base64}
            width={gifs.base64[0].w}
          />
        </FlexWrap>
      )
    }
  </FlexWrap>
)

const GifWithStyled = styled(GifWrapper)`

`

export const GifImages = connect(state => ({
  gifs: state.gifs,
}))(GifWithStyled)
