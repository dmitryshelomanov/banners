import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const CarouselBtn = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  z-index: 2;
  ${props => props.isLeft
    ? 'border-right: 20px solid #47a4a5; left: 0;'
    : 'border-left: 20px solid #47a4a5; right: 0'
};
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
  top: calc(50% - 25px);
  cursor: pointer
`
CarouselBtn.propTypes = {
  isLeft: PropTypes.bool.isRequired,
}
CarouselBtn.defaultProps = {
  isLeft: false,
}
