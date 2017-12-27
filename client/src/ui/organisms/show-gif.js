import React from 'react'
import { connect } from 'react-redux'
import { baseURL } from '../../config'
import {
  FlexWrap,
} from '../'

const WrapGif = FlexWrap.extend`
  margin: 25px
`
const ShowGif = ({ readyURL }) => (
  <FlexWrap
    width="100%"
    ai="center"
    jc="center"
  >
    {
      readyURL && (
        <WrapGif>
          <img
            alt="readygif"
            src={`${baseURL}gif-ready/${readyURL}?v=${Math.random()}`}
          />
        </WrapGif>
      )
    }
  </FlexWrap>
)

export const ShowGifWithGif = connect(state => ({
  readyURL: state.gifs.readyURL,
}))(ShowGif)
