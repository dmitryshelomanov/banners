import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const Range = styled.input.attrs({
  type: 'range',
  min: props => props.min,
  max: props => props.max,
  step: props => props.step,
})`
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
  outline: none;
  overflow: hidden;
  width: ${props => props.width};
  background-color: #9a905d;
  & ::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #13bba4;
    margin-top: -1px;
  }
`

export const RangeVertical = Range.extend`
  -webkit-appearance: slider-horizontal;
`


Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  width: PropTypes.string,
}

Range.defaultProps = {
  min: 0,
  max: 10,
  step: 1,
  width: '80px',
}
