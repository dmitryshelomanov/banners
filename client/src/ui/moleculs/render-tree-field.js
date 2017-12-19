import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FlexWrap,
  Text,
  FolderIcon,
  FilesIcon,
} from '../'

/* eslint-disable react/no-array-index-key */

const extensions = [
  '.jpg', '.png', '.jpeg',
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
  addImage = (img) => {
    if (img.type === 'file'
        && extensions.indexOf(img.extension) !== -1) {
      let url = img.path.split('decompress\\')[1]

      url = url.replace(/[\\]+/ig, '/')
      this.props.onAddImage({
        url,
        path: img.path,
        originalSize: img.size,
        name: url.split('\\')[0],
      })
    }
  }

  render() {
    const { folders, padding, onAddImage } = this.props

    return (
      <FlexWrap
        fd="column"
        style={{
          paddingLeft: folders.type === 'directory' ? padding * 10 : 0,
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

RenderTree.propTypes = {
  folders: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.array,
    type: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  padding: PropTypes.number,
  onAddImage: PropTypes.func.isRequired,
}

RenderTree.defaultProps = {
  padding: 0,
}
