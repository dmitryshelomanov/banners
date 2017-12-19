import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlexWrap,
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

const CarouselInner = FlexWrap.extend`
  transition: transform .5s
`

export class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0,
      slideNext: 2,
      width: props.width,
    }
  }

  nextSlide = () => {
    const { carousel } = this.props
    const len = carousel.images.length
    const wrapperWidth = this.wrap.getBoundingClientRect().width

    if (len * this.state.width < wrapperWidth) return
    this.setState({ currentSlide: this.state.currentSlide + this.state.slideNext })
  }

  prevSlide = () => {
    if (this.state.currentSlide <= 0) return
    this.setState({ currentSlide: this.state.currentSlide - this.state.slideNext })
  }

  render() {
    const { carousel, component } = this.props
    const { width, currentSlide } = this.state
    const transform = `${-(width * currentSlide)}px`
    const len = carousel.images ? carousel.images.length : carousel.length
    const data = carousel.images ? carousel.images : carousel

    return (
      <FlexWrap
        fd="column"
        width="100%"
        style={{
          visibility: len > 0 ? 'visible' : 'hidden',
        }}
      >
        <CarouselWrap
          innerRef={(c) => {
            this.wrap = c
          }}
        >
          <CarouselInner
            width={`${width * len}px`}
            style={{
              transform: `translateX(${transform})`,
            }}
          >
            {
              data.map((i, k) => (
                React.cloneElement(component, {
                  key: k,
                  ids: k,
                  carousel: i,
                  width: `${width}px`,
                })
              ))
            }
          </CarouselInner>
        </CarouselWrap>
      </FlexWrap>
    )
  }
}

Carousel.propTypes = {
  component: PropTypes.element.isRequired,
  carousel: PropTypes.oneOfType([
    PropTypes.shape({
      activeImage: PropTypes.number,
      images: PropTypes.array,
    }),
    PropTypes.array,
  ]).isRequired,
  width: PropTypes.number,
}

Carousel.defaultProps = {
  width: 180,
}
