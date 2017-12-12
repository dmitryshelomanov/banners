import React, { Component } from 'react'
import {
  FlexWrap,
  Caption,
  Button,
  UploadBtn
} from '../ui'
import WithUploadFile from '../../hocs/withUploadFile'


const ButtonWithHoc = WithUploadFile(UploadBtn)

class ArchiveTree extends Component {
  _uploadBanner() { 
    console.log('upload')
  }
  render() {
    return (
      <FlexWrap
        fd="column"
      >
        <Caption>
          Загрузить архив с банером
        </Caption>
        <ButtonWithHoc
          text="btn1"
        />
      </FlexWrap>
    )
  }
}

export default ArchiveTree
