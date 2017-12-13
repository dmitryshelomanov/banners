import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addImageToCarousel } from '../redux/actions/carousel'


export default WrapClass => { 
  class WithFolderTree extends Component { 
    render() { 
      return (
        <div>
          {
            this.props.folders.name && <WrapClass
              folders={this.props.folders}
              onAddImage={this.props.onAddImage}
            />
          }
        </div>
      )
    }
  }
  return connect(
    state => ({
      folders: state.archiveUpload.treeFolders
    }),
    dispatch => ({
      onAddImage: (img) => { 
        dispatch(addImageToCarousel(img))
      }
    })
  )(WithFolderTree)
}
