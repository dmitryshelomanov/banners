import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const btn = ({ className, text, ...rest }) => (
  <button className={className} {...rest}>
    {text}
  </button>
)

export const Button = styled(btn)`
  width: 180px;
  background: #3c638a;
  border-radius: 5px;
  padding: 20px 18px;
  color: #fff;
  width: 315px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .5s;
  border: 2px solid transparent;
  outline: none;
  &.active-btn {
    color: #3c638a;
    background: #fff;
    border-color: #3c638a
  }
`
btn.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
