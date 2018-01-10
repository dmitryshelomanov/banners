import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FlexWrap,
} from '../'
import arrow from '../../assets/img/arrow.png'

/* eslint-disable no-return-assign */

const UploadStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background: #1a3a5b;
  padding: 18px 25px;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer
`

export class UploadBtn extends Component {
  constructor(props) {
    super(props)
    this.files = null
  }

  componentDidMount() {
    this.files.addEventListener('change', this.props.changeInput)
  }

  componentWillUnmount() {
    this.files.removeEventListener('change', this.props.changeInput)
  }

  handleInputFile = () => {
    this.files.click()
  }

  render() {
    const { className, changeInput, text } = this.props

    return (
      <FlexWrap
        width="100%"
      >
        <input
          type="file"
          ref={(c) => {
            this.files = c
          }}
        />
        <UploadStyled onClick={this.handleInputFile}>
          {text}
          <img
            src={arrow}
            alt="arrow"
          />
        </UploadStyled>
      </FlexWrap>
    )
  }
}

UploadBtn.propTypes = {
  text: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
}
