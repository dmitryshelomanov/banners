import React, { Component } from 'react'
import styled from 'styled-components'
import { 
  Text,
  FlexWrap,
  Image,
  ChangeImage
} from '../'

const CarouselWrap = FlexWrap.extend`
  width: 100%;
  overflow: hidden;
  transition: all .5s;
  border-top: 2px solid #47A4A5;
  background-color: #F0FAFA;
  padding: 15px;
  box-sizing: border-box;
`

export class Carousel extends Component {
  render() {
    const { images } = this.props.carousel
    const { component, carousel } = this.props

    return (  
      <FlexWrap
        fd="column"
        width="100%"
        style={{
          visibility: images.length > 0 ? 'visible' : 'hidden'
        }}
      >
        <CarouselWrap>
          {
            images.map((i, k) => (
              React.cloneElement(component, {
                key: k,
                ids: k,
                carousel
              })
            ))
          }
        </CarouselWrap>
        <ChangeImage />
      </FlexWrap>
    )
  }
}
