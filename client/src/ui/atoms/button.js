import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { ifProp } from '../../helpers/theming'


const btn = ({
  primary, secondary, thirty, className, text, ...rest
}) => (
  <button className={className} {...rest}>
    {text}
  </button>
)

export const Button = styled(btn)`
  width: 180px;
  color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  padding: 20px 18px;
  width: 315px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .5s;
  border: 2px solid transparent;
  outline: none;
  ${ifProp('primary', css`
    background: ${({ theme }) => theme.color.color12};
    &:hover {
      background: ${({ theme }) => theme.color.color11};
    }
  `)}
  ${ifProp('secondary', css`
    background: ${({ theme }) => theme.color.color11};
    &:hover {
      background: ${({ theme }) => theme.color.color10};
    }
  `)}
  ${ifProp('thirty', css`
    background: ${({ theme }) => theme.color.white};
    border-color: ${({ theme }) => theme.color.color10};
    color: ${({ theme }) => theme.color.color10};
    &:hover {
      border-color: ${({ theme }) => theme.color.color11};
      color: ${({ theme }) => theme.color.color11};
      background: ${({ theme }) => theme.color.white};
    }
  `)}
  &:disabled {
    background: ${({ theme }) => theme.color.color1};
    color: ${({ theme }) => theme.color.color4};
    border-color: transparent;
  }
`
Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

Button.defaultProps = {
  primary: true,
  secondary: false,
  thirty: false,
}
