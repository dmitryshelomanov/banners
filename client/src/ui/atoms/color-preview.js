import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const ColorPreview = styled.div`
  display: block;
  width: 80px;
  height: 26px;
  background: ${props => props.color};
  border: 2px solid #c8c8c8;
  cursor: pointer;
`

ColorPreview.propTypes = {
  color: PropTypes.string,
}
