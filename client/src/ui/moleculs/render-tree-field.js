import React, { Component } from 'react'
import styled from 'styled-components'
import { 
  TreeField,
  FlexWrap,
  Text,
  FolderIcon,
  FilesIcon
} from '../'


const extensions = [
  '.jpg', '.png', '.jpeg'
]

const Folder = Text.extend`
  border-bottom: 1px solid #eaecef;
  padding: 10px 0;
  box-sizing: border-box;
  margin: 0;
  color: #0366d6;
  cursor: pointer
`

export class RenderTree extends Component {
  addImage = img => {
    if (img.type === 'file' &&
        extensions.indexOf(img.extension) !== -1) {

      let url = img.path.split('decompress\\')[1]
      url = url.replace(/[\\]+/ig, '/')
      this.props.onAddImage({
        url,
        path: img.path,
        originalSize: img.size,
        name: url.split('\\')[0] 
      })
    }
  }

  render() {
    const { folders, padding = 0, onAddImage } = this.props
    return (
      <FlexWrap
        fd="column"
        style={{
          paddingLeft: folders.type === 'directory' ? padding * 10 : 0
        }}
      >
        <Folder
          onClick={() => this.addImage(folders)}
        >
          {
            folders.type === 'directory' 
              ? <FolderIcon />
              : <FilesIcon />
          }
          {folders.name}
        </Folder>
        <FlexWrap
          fd="column"
          style={{ paddingLeft: folders.type === 'directory' ? padding * 10 : 0 }}
        >
          {
            folders.children && folders.children.map((item, key) => (
              <RenderTree
                folders={item}
                key={key}
                padding={key + 1}
                onAddImage={onAddImage}
              />
            ))
          }
        </FlexWrap>
      </FlexWrap>
    )
  }
}
