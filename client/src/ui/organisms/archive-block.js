import React, { Component } from 'react'
import WithFolderTree from '../../hocs/with-folder-tree'
import {
  ArchiveUpload,
  FlexWrap,
  RenderTree,
} from '../'


const RenderTreeHoc = WithFolderTree(RenderTree)

export const ArchiveBlock = () => (
  <FlexWrap
    fd="column"
  >
    <ArchiveUpload />
    <RenderTreeHoc />
  </FlexWrap>
)
