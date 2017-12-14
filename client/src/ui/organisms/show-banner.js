import React, { Component } from 'react'
import {
  FlexWrap,
  Text,
  Button,
  Caption,
} from '../'


export class ShowBanner extends Component {
  reloadBanner = () => {
    this.banner.src = 'http://localhost:8000/process/f96b30abd1ee6404a02bdb75270e2ec6--240x400.zip/240x400.html'
  }
  render() {
    return (
      <FlexWrap
        width="100%"
        fd="column"
      >
        <Caption>
          Итоговый баннер
        </Caption>
        <Button
          text="перезагрузить"
          onClick={this.reloadBanner}
        />
        <iframe 
          id="main"
          src="http://localhost:8000/process/f96b30abd1ee6404a02bdb75270e2ec6--240x400.zip/240x400.html" 
          width="100%"
          height="500px"
          frameBorder="0"
          ref={c => this.banner = c}
        />
      </FlexWrap>
    )
  }
}
