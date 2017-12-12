import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
  Caption
} from '../atoms'
import {
  UploadBtn
} from '../moleculs'
import WithUploadHoc from '../../hocs/with-upload-file'


const Button = WithUploadHoc(UploadBtn)

class TreeRender extends Component {
  render() {
    return (
      <FlexWrap
        fd="column"
      >
        <Caption>Загрузите архив</Caption>
        <Button 
          text="+"
        />
        <code>
          <pre>{JSON.stringify(this.props.treeFolder, 2, 2)}</pre>
        </code>
      </FlexWrap>
    )
  }
}

export const TreeRenderHoc = connect(
  state => ({
    treeFolder: state.treeFolder
  })
)(TreeRender)