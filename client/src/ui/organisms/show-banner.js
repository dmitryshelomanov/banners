import React, { Component } from 'react'
import axios from 'axios'
import {
  FlexWrap,
  Text,
  Button,
  Caption,
} from '../'


export class ShowBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: null
    }
  }
  async componentDidMount() {
    let data = await axios.get(`http://localhost:8000/test`)
    this.setState({ html: `${data.data}` })
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
        {
          this.state.html &&         <iframe 
          id="main"
          srcDoc={`${this.state.html}`} 
          width="100%"
          height="500px"
          frameBorder="0"
          ref={c => this.banner = c}
        />
        }
      </FlexWrap>
    )
  }
}
