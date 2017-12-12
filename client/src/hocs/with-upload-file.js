import React, { Component } from 'react'
import axios from 'axios'


export default BaseClass => {
  class withUploadFile extends Component {
    _onUploadProgress = (progressEvent) => { 
      console.log(progressEvent)
    }

    _onChangeInput = async ({ target }) => {
      const file = target.files[0]
      let form = new FormData
      form.append('archive', file)
      let data = await axios.post(`http://localhost:8000/upload`, form)
    }

    render() {
      return (
        <BaseClass
          _changeInput={this._onChangeInput}
          {...this.props}
        />
      )
    }
  }
  return withUploadFile
}