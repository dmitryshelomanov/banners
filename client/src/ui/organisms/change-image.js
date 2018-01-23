import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InputRange from 'react-input-range'
import {
  FlexWrap,
  ImageReview,
} from '../'
import { compressActiveImage } from '../../redux/actions/carousel'

/* eslint-disable  react/sort-comp */
const Wrap = FlexWrap.extend`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  justify-content: space-around;
`

class Change extends Component {
  state = {
    lastCoords: {
      x: 0, y: 0,
    },
  }

  isAdded = false
  isPressed = false

  componentDidUpdate() {
    if (this.cloneWrap && this.originalWrap && !this.isAdded) {
      this.isAdded = true
      this.addEventListener()
    }
  }

  componentWillUnmount() {
    if (this.cloneWrap && this.originalWrap) {
      this.removeListeners()
    }
  }

  addEventListener = () => {
    [this.originalWrap, this.cloneWrap].forEach((i) => {
      i.addEventListener('mousedown', this.imageHandleDown)
      i.addEventListener('mouseup', this.imageHandleUp)
    })
  }

  removeListeners = () => {
    [this.originalWrap, this.cloneWrap].forEach((i) => {
      i.removeEventListener('mousedown', this.imageHandleDown)
      i.removeEventListener('mouseup', this.imageHandleUp)
    })
  }

  imageHandleDown = (e) => {
    e.preventDefault()
    this.isPressed = true
    this.setState({
      lastCoords: {
        x: e.layerX, y: e.layerY,
      },
    }, () => {
      [this.originalWrap, this.cloneWrap].forEach((i) => {
        i.onmousemove = this.mouseMove
      })
    })
  }

  imageHandleUp = (e) => {
    e.preventDefault()
    this.isPressed = false
    return false
  }

  mouseMove = (e) => {
    if (!this.isPressed) return
    this.grabStage(
      e,
      [this.originalWrap, this.cloneWrap],
    )
  }

  grabStage = (e, containers) => {
    const { layerX: endX, layerY: endY } = e
    const { x: startX, y: startY } = this.state.lastCoords
    const initialContainer = containers[0]

    const distance = {
      x: Math.abs(endX - startX),
      y: Math.abs(endY - startY),
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
    return true
  }

  scale = (e) => {
    e.preventDefault()
    const ratio = (w, h) => w / h === 0 ? 1 : w / h
    const operation = (value1, value2) => e.deltaY < 0 ? (value1 + value2) : (value1 - value2)
    const el = [this.originalWrap, this.cloneWrap]

    for (let i = 0; i < el.length; i++) {
      const img = el[i].querySelector('img')
      const r = ratio(img.width, img.height)
      const newW = operation(img.width, 15)

      img.style.width = `${newW}px`
      img.style.height = `${newW / r}px`
    }
  }

  render() {
    const { activeImage } = this.props.carousel

    return (
      <FlexWrap
        w="100%"
      >
        {
          activeImage !== null && (
            <Wrap>
              <ImageReview
                isOrigin
                onWheel={this.scale}
                nestedRef={(comp) => {
                  this.originalWrap = comp
                }}
              />
              <ImageReview
                isOrigin={false}
                onWheel={this.scale}
                nestedRef={(comp) => {
                  this.cloneWrap = comp
                }}
              />
            </Wrap>
          )
        }
      </FlexWrap>
    )
  }
}

Change.propTypes = {
  carousel: PropTypes.shape({
    activeImage: PropTypes.number,
    images: PropTypes.array,
  }).isRequired,
}

export const ChangeImage = connect(
  state => ({
    carousel: state.carousel,
  }),
  dispatch => ({
    onCompress: (img, q) => {
      dispatch(compressActiveImage(img, q))
    },
  }),
)(Change)
