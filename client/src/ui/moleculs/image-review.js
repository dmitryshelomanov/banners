import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlexWrap,
} from '../'
import CacheLinks from '../../helpers/image-cache'
import { baseURL } from '../../config'
import updateSystem from '../../helpers/update-system'

/* eslint-disable no-magic-numbers */

const Wrapper = FlexWrap.extend`
  display: flex;
  flex-direction: column;
  width: 43%;
  & .info {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 15px 0;
  }
  & .image-wrapper {
    display: block;
    overflow: hidden;
    border: none;
    background: #FFFFFF url(http://optimizilla.com/images/grid3x.png) repeat;
    position: relative;
    cursor: move;
    width: 100%;
    height: 350px;
    & img {
      position: relative;
      display: block;
      margin: 0 auto
    }
  }
`

export class ImageReview extends Component {
  constructor(props) {
    super(props)
    this.cache = new CacheLinks()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.imageActive.name !== nextProps.imageActive.name) {
      this.img.removeAttribute('style')
      this.cache.clear()
    }
    if (!nextProps.isCompress && this.props.isCompress) {
      const folder = this.props.isOrigin ? 'decompress' : 'process'

      this.cache.update(`${baseURL}${folder}/${this.props.imageActive.url}`)
    }
  }

  linkGenerate() {
    const { isOrigin, imageActive } = this.props
    const folder = isOrigin ? 'decompress' : 'process'

    if (!this.cache.isset(`${baseURL}${folder}/${imageActive.url}`)) {
      this.cache.add(`${baseURL}${folder}/${imageActive.url}`)
    }
    return this.cache.get(`${baseURL}${folder}/${imageActive.url}`)
  }

  render() {
    const { isOrigin, nestedRef, dispatch, imageActive, isCompress, ...rest } = this.props
    const folder = isOrigin ? 'decompress' : 'process'

    return (
      <Wrapper>
        <div className="info">
          {isOrigin && imageActive.info && `Исходный ( ${updateSystem(imageActive.info.originalSize)} )`}
          {!isOrigin && imageActive.info && `Сжатый ( ${updateSystem(imageActive.info.newSize)} )`}
        </div>
        <div
          className="image-wrapper"
          ref={nestedRef && nestedRef}
          draggable={false}
          {...rest}
        >
          <img
            alt="img"
            ref={(c) => {
              this.img = c
            }}
            src={this.linkGenerate()}
            draggable={false}
          />
        </div>
      </Wrapper>
    )
  }
}

ImageReview.propTypes = {
  isOrigin: PropTypes.bool.isRequired,
  imageActive: PropTypes.shape({
    quality: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
    originalSize: PropTypes.number,
    path: PropTypes.string,
    replacer: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  nestedRef: PropTypes.oneOfType([
    PropTypes.func,
  ]),
}

ImageReview.defaultProps = {
  nestedRef: null,
}
