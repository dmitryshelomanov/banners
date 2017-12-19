import React, { Component } from 'react'
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

  prevSlide = (e) => {
    e.preventDefault()
    if (this.state.currentSlide <= 0) return
    this.setState({ currentSlide: this.state.currentSlide - this.state.slideNext })
  }

  render() {
    const { carousel, component } = this.props
    const { width, currentSlide } = this.state
    const transform = `${-(width * currentSlide)}px`
    const len = carousel.images.length

    return (
      <FlexWrap
        fd="column"
        width="100%"
        onClick={this.nextSlide}
        onContextMenu={this.prevSlide}
        style={{
          visibility: carousel.images.length > 0 ? 'visible' : 'hidden',
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
              carousel.images.map((i, k) => (
                React.cloneElement(component, {
                  key: k,
                  ids: k,
                  carousel,
                  width: `${width}px`,
                })
              ))
            }
          </CarouselInner>
        </CarouselWrap>
        <ChangeImage />
      </FlexWrap>
    )
  }
}

Carousel.propTypes = {
  component: PropTypes.element.isRequired,
  carousel: PropTypes.shape({
    activeImage: PropTypes.number,
    images: PropTypes.array,
  }).isRequired,
  width: PropTypes.number,
}

Carousel.defaultProps = {
  width: 180,
}
