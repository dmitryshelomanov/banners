import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FlexWrap,
  ChangeImage,
} from '../'

/* eslint-disable react/no-array-index-key */

const CarouselWrap = FlexWrap.extend`
  width: 100%;
  overflow: hidden;
  transition: all .5s;
  border-top: 2px solid #47A4A5;
  background-color: #F0FAFA;
  padding: 15px;
  box-sizing: border-box;
`

export const Carousel = ({ component, carousel }) => (
  <FlexWrap
    fd="column"
    width="100%"
    style={{
      visibility: carousel.images.length > 0 ? 'visible' : 'hidden',
    }}
  >
    <CarouselWrap>
      {
        carousel.images.map((i, k) => (
          React.cloneElement(component, {
            key: k,
            ids: k,
            carousel,
          })
        ))
      }
    </CarouselWrap>
    <ChangeImage />
  </FlexWrap>
)

Carousel.propTypes = {
  component: PropTypes.element.isRequired,
  carousel: PropTypes.shape({
    activeImage: PropTypes.number,
    images: PropTypes.array,
  }).isRequired,
}
