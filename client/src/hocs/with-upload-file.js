import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { uploadFile } from '../redux/actions/tree-folder'


export default (BaseClass) => {
  class withUploadFile extends Component {
    onChangeInput = ({ target }) => {
      const form = new FormData()

      form.append('archive', target.files[0])
      this.props.onUploadFile(form)
    }

    render() {
      const { onUploadFile, ...rest } = this.props

      return (
        <BaseClass
          changeInput={this.onChangeInput}
          {...rest}
        />
      )
    }
  }

  withUploadFile.propTypes = {
    onUploadFile: PropTypes.func.isRequired,
  }

  return connect(
    state => ({}),
    dispatch => ({
      onUploadFile: (file) => {
        dispatch(uploadFile(file))
      },
    }),
  )(withUploadFile)
}
