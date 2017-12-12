import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { uploadFile } from '../redux/actions/tree-folder'


export default BaseClass => {
  class withUploadFile extends Component {
    _onChangeInput = ({ target }) => {
      let form = new FormData
      form.append('archive', target.files[0])
      this.props.onUploadFile(form)
    }

    render() {
      console.log(BaseClass)
      return (
        <BaseClass
          _changeInput={this._onChangeInput}
          text={this.props.text}
        />
      )
    }
  }
  return connect(
    state => ({}),
    dispatch => ({
      onUploadFile: file => {
        dispatch(uploadFile(file))
      } 
    })
  )(withUploadFile)
}
