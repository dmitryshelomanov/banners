import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Button,
  FlexWrap
} from '../'


export class UploadBtn extends Component {
  componentDidMount() {
    this.refs.files.addEventListener('change', this.props._changeInput)
  }

  componentWillUnmount() {
    this.refs.files.removeEventListener('change', this.props._changeInput)
  }

  _handleInputFile = () => {
    this.refs.files.click()
  }

  render() {
    const { className, text, _changeInput, ...rest } = this.props
    return (
      <FlexWrap>
        <input type="file" ref="files" />
        <Button
          onClick={this._handleInputFile}
          text={text}
          {...rest}
        />
      </FlexWrap>
    )
  }
}

UploadBtn.propTypes = {
  text: PropTypes.string.isRequired,
  _changeInput: PropTypes.func.isRequired
}
