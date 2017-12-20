import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { gifGenerated } from '../../redux/actions/gif'
import {
  FlexWrap,
  GifItem,
  Carousel,
  Button,
} from '../'

/* eslint-disable react/no-array-index-key */

const GifWrapper = ({ gifs, onGenerated, archiveName }) => (
  <FlexWrap
    width="100%"
  >
    {
      gifs.data.length > 0 && (
        <FlexWrap
          width="100%"
          fd="column"
        >
          <Carousel
            component={<GifItem />}
            carousel={gifs.data}
            width={gifs.data[0].w}
          />
          <Button
            text="сгенерить гиф"
            onClick={() => onGenerated({name: archiveName})}
          />
        </FlexWrap>
      )
    }
  </FlexWrap>
)

const GifWithStyled = styled(GifWrapper)`

`

export const GifImages = connect(
  state => ({
    gifs: state.gifs,
    archiveName: state.archiveUpload.treeFolders.name,
  }),
  dispatch => ({
    onGenerated: (name) => {
      dispatch(gifGenerated(name))
    },
  }),
)(GifWithStyled)
