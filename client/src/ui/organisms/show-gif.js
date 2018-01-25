import React from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
} from '../'
import { getGifSize } from '../../redux/gif/selectors'


const ShowGif = ({ gifSize }) => (
  <FlexWrap
    width="100%"
    ai="center"
    jc="center"
  >
    gif
  </FlexWrap>
)

const mapStateToProps = (state, props) => ({
  gifSize: getGifSize(state, props),
})

export const ShowGifWithGif = connect(mapStateToProps)(ShowGif)
