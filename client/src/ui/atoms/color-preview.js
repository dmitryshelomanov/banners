import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


export const ColorPreview = styled.div`
    display: block;
    padding: 25px 60px;
    background: ${props => props.color};
    border: 4px solid #c8c8c8;
    cursor: pointer;
    margin-bottom: 15px;
`

ColorPreview.propTypes = {
  color: PropTypes.string,
}
