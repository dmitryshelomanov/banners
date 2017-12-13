import React, { Component } from 'react'
import {
  UploadBtn
} from './upload-button'
import { 
  FlexWrap,
  Caption
} from '../'
import WithUploadHoc from '../../hocs/with-upload-file'


const Button = WithUploadHoc(UploadBtn)

export class ArchiveUpload extends Component {
  render() {
    return (
      <FlexWrap
        fd="column"
      >
        <Caption>Загрузите архив</Caption>
        <Button 
          text="Загрузить"
        />
      </FlexWrap>
    )
  }
}
