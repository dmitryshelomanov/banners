import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  FlexWrap,
  ImageReview,
  Range
} from '../'
import { compressActiveImage } from '../../redux/actions/carousel'


const Wrap = FlexWrap.extend`
  border-top: 2px solid #FFF0ED;
  background-color: #F0FAFA;
  padding: 15px;
  box-sizing: border-box;
  justify-content: space-around;
`

class Change extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPressed: false,
      oldX: 0,
      oldY: 0,
      oldScale: 1,
      swipeSpeed: 10,
      currentLeft: 0,
      currentTop: 0,
      lastMove: Date.now()
    }
  }
  
  componentDidUpdate() {
    if (this.cloneWrap && this.originalWrap) {
      this.originalImage = this.originalWrap.querySelector('img')
      this.cloneImage = this.cloneWrap.querySelector('img')
      this.addEventListener()
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  addEventListener = () => {
    this.originalWrap.addEventListener('mousedown', this.imageHandleDown)
    this.originalWrap.addEventListener('mouseup', this.imageHandleUp)
    this.originalWrap.addEventListener('mousewheel', this.scale)
  }

  removeListeners = () => { 
    this.originalWrap.removeEventListener('mousedown', this.imageHandleDown)
    this.originalWrap.removeEventListener('mouseup', this.imageHandleUp)
    this.originalWrap.removeEventListener('mousewheel', this.scale)
  }

  imageHandleDown = (e) => {
    this.setState({ isPressed: true }, () => {
      this.originalWrap.onmousemove = this.mouseMove
    })
  }

  imageHandleUp = () => { 
    this.setState({ isPressed: false })
  }

  mouseMove = (e) => {
    if (!this.state.isPressed) return
    this.moveX(e)
    this.moveY(e)
  }

  moveX = (e) => {
    const { offsetX, offsetY, px, py } = this.getMouseCoord(e)

    this.originalImage.style.left = `${offsetX}px`
    this.cloneImage.style.left = `${offsetX}px`
  }

  moveY = (e) => {
    const { offsetX, offsetY, px, py } = this.getMouseCoord(e)

    this.originalImage.style.top = `${offsetY}px`
    this.cloneImage.style.top = `${offsetY}px`
  }

  scale = (e) => {

  }

  getMouseCoord = (e) => ({
    px: e.x,
		py: e.y,
		offsetX: e.offsetX,
		offsetY: e.offsetY
  })

  render() {
    const { carousel, onCompress } = this.props
    const { activeImage } = this.props.carousel

    return (
      <FlexWrap
        width="100%"
      >
        {
          activeImage !== null && <Wrap
            width="100%"
          >
            <ImageReview
              isOrigin={true}
              nestedRef={(comp) => this.originalWrap = comp}
            />
            <ImageReview
              isOrigin={false}
              nestedRef={(comp) => this.cloneWrap = comp}
            />
            <Range
              min={0}
              step={1}
              max={100}
              innerRef={(comp) => this.range = comp}
              onMouseUp={() => {
                onCompress(
                  carousel.images[activeImage], this.range.value
                )
              }}
            />
          </Wrap>
        }
      </FlexWrap>
    )
  }
}

export const ChangeImage = connect(
  state => ({
    carousel: state.carousel
  }),
  dispatch => ({
    onCompress: (img, q) => { 
      dispatch(compressActiveImage(img, q))
    }
  })
)(Change)
