import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const Icon = ({ className }) => (
  <svg
    aria-hidden="true"
    className={className}
    height="16"
    version="1.1"
    viewBox="0 0 12 16"
    width="12"
  >
    <path
      d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"
    />
  </svg>
)

Icon.propTypes = {
  className: PropTypes.string.isRequired,
}

export const FilesIcon = styled(Icon)`
  color: rgba(3,47,98,0.5);
  fill: currentColor;
  margin-right: 15px
`
