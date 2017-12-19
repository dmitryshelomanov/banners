import React from 'react'
import {
  FlexWrap,
  Caption,
} from '../'
import WithUploadHoc from '../../hocs/with-upload-file'
import { UploadBtn } from './upload-button'


const Button = WithUploadHoc(UploadBtn)

export const ArchiveUpload = () => (
  <FlexWrap
    fd="column"
  >
    <Caption>Загрузите архив</Caption>
    <Button
      text="Загрузить"
    />
  </FlexWrap>
)
