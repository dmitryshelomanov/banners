import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const FlexWrap = styled.div`
  display: flex;
  padding: ${props => props.padding};
  justify-content: ${props => props.jc};
  align-items: ${props => props.ai};
  width: ${props => props.w};
  height: ${props => props.h};
  flex-direction: ${props => props.fd};
  box-sizing: border-box;
`
FlexWrap.propTypes = {
  jc: PropTypes.string,
  ai: PropTypes.string,
  w: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  h: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  fd: PropTypes.string,
  padding: PropTypes.number,
}

FlexWrap.defaultProps = {
  w: 'auto',
  h: 'auto',
  jc: 'flex-start',
  ai: 'flex-start',
  fd: 'row',
  padding: 0,
}
