import React, { Component } from 'react'
import styled from 'styled-components'
import WithCarouselImage from '../../hocs/with-carousel-image'
import { 
  FlexWrap
} from '../'
import updateSystem from '../../helpers/updateSystem'


const InfoWithStyle = FlexWrap.extend`
  background: red;
  position: relative;
  background: #40a1a2;
  color: #fff;
  padding: 15px;
`

class Image extends Component { 
  render() { 
    const { className, carousel, isOrigin, nestedRef } = this.props

    const folder = isOrigin ? 'decompress' : 'process'
    const v = Math.floor(Math.random() * 2000)
    const imageActive = carousel.images[carousel.activeImage]
  
    return (
      <FlexWrap
        fd="column"
        width="100%"
        innerRef={nestedRef && nestedRef}
      >
        <InfoWithStyle
          className={"info"}
          width="90%"
        >
          {
            isOrigin && imageActive.info
              ? `Исходный ( ${updateSystem(imageActive.info.originalSize)} )kb`
              : `Сжатый ( ${updateSystem(imageActive.info.newSize)} )kb`
          }
        </InfoWithStyle>
        <FlexWrap
          className={className}
          width="90%"
        >
          <img
            src={`http://localhost:8000/${folder}/${imageActive.url}?v=${v}`}
            draggable={false}
          />
        </FlexWrap>
      </FlexWrap>
    )
  }
}

const withStyle = styled(Image) `
  display: flex;
  height: 350px;
  overflow: hidden;
  border: 1px solid #CCCCCC;
  background: #FFFFFF url(http://optimizilla.com/images/grid3x.png) repeat;
  position: relative;
  cursor: move;
  align-items: center;
  justify-content: center;
  & img {
    width: auto;
    margin: 0;
    position: absolute;
    transition: all .1s
  }
`

export const ImageReview = WithCarouselImage(withStyle)