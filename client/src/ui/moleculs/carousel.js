import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { 
  Text,
  FlexWrap,
  Image
} from '../'


const CarouselWrap = FlexWrap.extend`
  width: 100%;
  overflow: hidden;
  transition: all .5s;
  background: url(http://optimizilla.com/images/grid3x.png);
  & img {
    margin-right: 15px
  }
`

export class Carousel extends Component {
  render() {
    const { images } = this.props.carousel
    return (
      <CarouselWrap>
        <FlexWrap>
          {
            images && images.map((item, key) => (
              <Image
                key={key}  
                src={`http://localhost:8000/${item.url}`}
              />
            ))
          }
        </FlexWrap>
      </CarouselWrap>
    )
  }
}
