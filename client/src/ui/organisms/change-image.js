import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  FlexWrap,
  ImageReview,
} from '../'
import { compressActiveImage } from '../../redux/actions/carousel'


const Wrap = FlexWrap.extend`
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
        x: 0, y: 0,
      },
    }
  }

  shouldComponentUpdate(nextProps, nextStore) {
    if (nextStore.isPressed !== this.state.isPressed) return false
    return true
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
    [this.originalWrap, this.cloneWrap].forEach((i) => {
      i.addEventListener('mousedown', this.imageHandleDown)
      i.addEventListener('mouseup', this.imageHandleUp)
      i.addEventListener('mousewheel', this.scale)
    })
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
        x: e.layerX, y: e.layerY,
      },
    }, () => {
      [this.originalWrap, this.cloneWrap].forEach((i) => {
        i.addEventListener('mousemove', this.mouseMove)
      })
    })
  }

  imageHandleUp = () => {
    this.setState({ isPressed: false })
    return false
  }

  mouseMove = (e) => {
    if (!this.state.isPressed) return
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
    const { carousel, onCompress } = this.props
    const { activeImage } = this.props.carousel

    return (
      <FlexWrap
        width="100%"
      >
        {
          activeImage !== null && (
            <Wrap width="100%">
              <ImageReview
                isOrigin
                nestedRef={(comp) => {
                  this.originalWrap = comp
                }}
              />
              <ImageReview
                isOrigin={false}
                nestedRef={(comp) => {
                  this.cloneWrap = comp
                }}
              />
              {/* <Range
                min={0}
                step={1}
                max={100}
                innerRef={(comp) => {
                  this.range = comp
                }}
                onMouseUp={() => {
                  onCompress(carousel.images[activeImage], this.range.value)
                }}
              /> */}
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
  onCompress: PropTypes.func.isRequired,
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
