import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const Image = styled.img.attrs({
  src: props => props.src
})`
  display: flex;
  width: ${props => props.width};
  max-width: 200px;
  height: auto;
  padding: 0
`

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string
}

Image.defaultProps = {
  width: '100%'
}
