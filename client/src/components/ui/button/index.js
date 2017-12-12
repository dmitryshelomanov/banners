import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const Button = ({ className, text, ...rest }) => (
  <button className={className} {...rest}>
    {text}
  </button>
)

const btnWithStyle = styled(Button)`
  outline: none;
  border: none;
  text-align: center;
  padding: 10px 15px;
  cursor: pointer
`

export default btnWithStyle
