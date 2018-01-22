import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { uploadFile } from '../redux/actions/tree-folder'
import * as types from '../redux/types'
import io from '../helpers/io'


export default (BaseClass) => {
  class withUploadFile extends Component {
    onChangeInput = ({ target }) => {
      const form = new FormData()

      if (this.props.archiveReady) {
        this.props.onClearState()
        io.emit('banner:delete-cache')
      }
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
    state => ({
      archiveReady: state.archiveUpload.archiveReady,
    }),
    dispatch => ({
      onUploadFile: (file) => {
        dispatch(uploadFile(file))
      },
      onClearState: () => {
        dispatch([
          { type: types.STATE_CLEAR_GLOBAL },
          { type: types.RESIZE_REST_STATE },
        ])
      },
    }),
  )(withUploadFile)
}
