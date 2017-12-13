import React, { Component } from 'react'
import WithFolderTree from '../../hocs/with-folder-tree'
import {
  ArchiveUpload,
  FlexWrap,
  RenderTree
} from '../'


const RenderTreeHoc = WithFolderTree(RenderTree)

export class ArchiveBlock extends Component {
  render() {
    return (
      <FlexWrap
        fd="column"
      >
        <ArchiveUpload />
        <RenderTreeHoc />
      </FlexWrap>
    )
  }
}
