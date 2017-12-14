import React, { Component } from 'react'
import styled from 'styled-components'
import WithCarouselImage from '../../hocs/with-carousel-image'
import { 
  FlexWrap
} from '../'
import updateSystem from '../../helpers/updateSystem'


const InfoWithStyle = FlexWrap.extend`
  top: 0;
  left: 0;
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
        width="43%"
      >
        <InfoWithStyle
          className={"info"}
          width="100%"
        >
          {
            isOrigin && imageActive.info
              ? `Исходный ( ${updateSystem(imageActive.info.originalSize)} )kb`
              : `Сжатый ( ${updateSystem(imageActive.info.newSize)} )kb`
          }
        </InfoWithStyle>
        <FlexWrap
          width="100%"
          height="350px"
          className={className}
          innerRef={nestedRef && nestedRef}
        >
          <img
            width="auto"
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
  overflow: hidden;
  border: 1px solid #CCCCCC;
  background: #FFFFFF url(http://optimizilla.com/images/grid3x.png) repeat;
  position: relative;
  cursor: move;
  align-items: center;
  justify-content: center;
  & img {
    position: absolute;
  }
`

export const ImageReview = WithCarouselImage(withStyle)