import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const FlexWrap = styled.div`
  display: flex;
  justify-content: ${props => props.jc};
  align-items: ${props => props.ai};
  width: ${props => props.width};
  height: ${props => props.height};
  flex-direction: ${props => props.fd};
`
FlexWrap.propTypes = {
  jc: PropTypes.string,
  ai: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fd: PropTypes.string
}

FlexWrap.defaultProps = {
  width: 'auto',
  height: 'auto',
  jc: 'flex-start',
  ai: 'flex-start',
  fd: 'row'
}
