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
  padding: 10px 15px;
  cursor: pointer
`
