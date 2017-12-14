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
      lastCoords: {
        x: 0, y: 0
      }
    }
  }
  
 componentDidUpdate() {
    if (this.cloneWrap && this.originalWrap) {
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
    this.setState({ 
      isPressed: true,
      lastCoords: {
        x: e.layerX, y: e.layerY
      }
    }, () => this.originalWrap.onmousemove = this.mouseMove )
  }

  imageHandleUp = (e) => {
    this.setState({ isPressed: false })
    return false
  }

  mouseMove = (e) => {
    if (!this.state.isPressed) return
    this.grabStage(
      e,
      [this.originalWrap, this.cloneWrap]
    )
  }

  grabStage = (e, containers) => {
    const { layerX: endX, layerY: endY } = e
    const { x: startX, y: startY } = this.state.lastCoords
    const initialContainer = containers[0]

    const distance = { 
      x: Math.abs(endX - startX), 
      y: Math.abs(endY - startY) 
    }

    if (distance.x === 0 && distance.y === 0) return false

    const direction = {
      x: (endX < startX) ? 'right' : 'left',
      y: (endY < startY) ? 'down' : 'up',
    }
  
    const toX = (direction.x === 'right') ? initialContainer.scrollLeft + distance.x : initialContainer.scrollLeft - distance.x
    const toY = (direction.y === 'down') ? initialContainer.scrollTop + distance.y : initialContainer.scrollTop - distance.y

    containers.forEach((i) => {
      i.scrollTo(toX, toY)
    })
  }
  

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
