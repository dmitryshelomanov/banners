import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const Caption = styled.h1`
  font-family: 'Exo 2', sans-serif !important;
  padding: 0;
  font-size: ${props => props.size};
`

Caption.propTypes = {
  size: PropTypes.number,
}

Caption.defaultProps = {
  size: 20,
}
