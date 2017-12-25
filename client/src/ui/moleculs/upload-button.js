import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Button,
  FlexWrap,
} from '../'

// /* eslint-disable no-return-assign */
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
    const { className, changeInput, ...rest } = this.props

    return (
      <FlexWrap>
        <input
          type="file"
          ref={(c) => {
            this.files = c
          }}
        />
        <Button
          onClick={this.handleInputFile}
          {...rest}
        />
      </FlexWrap>
    )
  }
}

UploadBtn.propTypes = {
  text: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
}
