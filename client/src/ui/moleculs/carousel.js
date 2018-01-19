import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlexWrap,
  CarouselBtn,
} from '../'

/* eslint-disable react/no-array-index-key */

const CarouselWrap = FlexWrap.extend`
  width: 100%;
  overflow: hidden;
  transition: all .5s;
  border: ${props => !props.isGif ? '2px dashed #e3e3e3' : 'none'};
  background-color:  ${props => !props.isGif ? '#f6f6f6' : 'transparent'};
  padding: 15px 40px;
  box-sizing: border-box;
  position: relative;
  align-items: center;
`

const CarouselInner = FlexWrap.extend`
  transition: transform .5s
`

const Wrapper = FlexWrap.extend`
  flex-direction: column;
  width: 90%;
  position: relative;
  & img.arrow-image {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    top: 45%;
  }
  & img.arrow-image-left {
    left: -50px;
  }
  & img.arrow-image-right {
    right: -50px;
  }
`

export class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0,
      slideNext: 1,
      width: props.width,
    }
  }

  nextSlide = () => {
    const { carousel } = this.props
    const len = carousel.images ? carousel.images.length : carousel.length
    const wrapperWidth = this.wrap.getBoundingClientRect().width

    if (len * this.state.width < wrapperWidth) return
    this.setState({ currentSlide: this.state.currentSlide + this.state.slideNext })
  }

  prevSlide = () => {
    if (this.state.currentSlide <= 0) return
    this.setState({ currentSlide: this.state.currentSlide - this.state.slideNext })
  }

  render() {
    const { carousel, component, isGif } = this.props
    const { width, currentSlide } = this.state
    const transform = `${-(width * currentSlide)}px`
    const len = carousel.images ? carousel.images.length : carousel.length
    const data = carousel.images ? carousel.images : carousel

    return (
      <Wrapper
        style={{
          visibility: len > 0 ? 'visible' : 'hidden',
        }}
      >
        <CarouselBtn
          onClick={this.prevSlide}
          isLeft
        />
        <CarouselWrap
          innerRef={(c) => {
            this.wrap = c
          }}
          isGif={isGif}
        >
          <CarouselInner
            w={`${width * len}px`}
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
        <CarouselBtn
          onClick={this.nextSlide}
        />
      </Wrapper>
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
  isGif: PropTypes.bool,
}

Carousel.defaultProps = {
  width: 180,
  isGif: false,
}
