import React from 'react'
import PropTypes from 'prop-types'
import LeftImage from '../../assets/img/arrow-left.png'
import RightImage from '../../assets/img/arrow-right.png'


export const CarouselBtn = ({ isLeft, ...rest}) => (
  <img
    className={isLeft ? 'arrow-image arrow-image-left' : 'arrow-image arrow-image-right'}
    {...rest}
    alt="arrow"
    src={isLeft ? LeftImage : RightImage}
  />
)

CarouselBtn.propTypes = {
  isLeft: PropTypes.bool,
}
CarouselBtn.defaultProps = {
  isLeft: false,
}
