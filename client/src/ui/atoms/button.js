import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const btn = ({ className, text, ...rest }) => (
  <button className={className} {...rest}>
    {text}
  </button>
)

export const Button = styled(btn)`
  outline: none;
  border: none;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  background: #47a4a5;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  border-color: #47A4A5
`
btn.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
