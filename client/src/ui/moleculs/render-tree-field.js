import React, { Component } from 'react'
import { 
  TreeField,
  FlexWrap,
  Text
} from '../'


const extensions = [
  '.jpg', '.png'
]

export class RenderTree extends Component {
  addImage = img => {
    if (img.type === 'file' && extensions.indexOf(img.extension) !== -1) { 
      let url = img.path.split('decompress\\')[1]
      this.props.onAddImage({
        url,
        path: img.path,
        name: url.split('\\')[0] 
      })
    }
  }

  render() {
    const { folders, padding = 0, onAddImage } = this.props
    return (
      <FlexWrap
        fd="column"
        style={{ paddingLeft: folders.type === 'directory' ? padding * 10 : 0 }}
      >
        <Text
          onClick={() => this.addImage(folders)}
        >
          {folders.name}
        </Text>
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
