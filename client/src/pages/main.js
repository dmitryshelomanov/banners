import React, { Component } from 'react'
import {
  RootContainer,
  ArchiveBlock,
  CompressImage,
  FlexWrap
} from '../ui'


export class Main extends Component {
  render() {
    return (
      <RootContainer>
        <FlexWrap
          fd="column"
          width="50%"
        >
          <ArchiveBlock />
          <CompressImage />
        </FlexWrap>
      </RootContainer>
    )
  }
}
