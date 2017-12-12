import React, { Component } from 'react'
import {
  RootContainer,
  FlexWrap
} from './components/ui'
import ArchiveTree from './components/archiveTree'


class App extends Component {
  render() {
    return (
      <RootContainer>
        <ArchiveTree />
      </RootContainer>
    )
  }
}

export default App
