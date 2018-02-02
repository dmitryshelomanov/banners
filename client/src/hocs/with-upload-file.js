import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { uploadFile } from '../redux/tree-folder/actions'
import emitter from '../helpers/emitter'
import { getArchiveReadyState } from '../redux/tree-folder/selectors'
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

  const mapStateToProps = (state, props) => ({
    archiveReady: getArchiveReadyState(state, props),
  })

  const mapDispatchToProps = (dispatch) => ({
    onUploadFile: (file) => {
      dispatch(uploadFile(file))
    },
    onClearState: () => {
      dispatch({ type: 'clearing' })
      emitter.clearStare()
    },
  })

  return connect(mapStateToProps, mapDispatchToProps)(withUploadFile)
}
