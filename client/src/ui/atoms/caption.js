import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const Caption = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily} !important;
  padding: 0;
  font-size: ${props => props.size}px;
  color: ${props => props.color};
`

Caption.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

Caption.defaultProps = {
  size: 20,
  color: 'black',
}
