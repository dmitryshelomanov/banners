import React, { Component } from 'react'
import {
  TreeRenderHoc as TreeRender,
  RootContainer
} from '../ui'


export class Main extends Component {
  render() {
    return (
      <RootContainer>
        <TreeRender />
      </RootContainer>
    )
  }
}