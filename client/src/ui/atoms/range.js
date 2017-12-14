import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const Range = styled.input.attrs({
  type: 'range',
  min: props => props.min,
  max: props => props.max,
  step: props => props.step,
}) `
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
  outline: none
`

Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
}
