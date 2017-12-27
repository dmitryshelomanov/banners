import React, { Component } from 'react'
import {
  RangeVertical,
  FlexWrap,
  Text,
} from '../'

/* eslint-disable  radix */
export class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      isPlay: true,
      duration: props.banner.timeline.duration,
    }
    this.playStart()
  }

  changeTimeLine = ({ target }) => {
    this.setState({ step: target.value }, () => {
      const { banner } = this.props

      banner.gotoAndStop(this.state.step)
    })
  }

  play = () => {
    this.setState({ isPlay: true })
  }

  playStart = () => {
    const { banner } = this.props

    setInterval(() => {
      if (!this.state.isPlay
        || this.state.step > this.state.duration) return

      this.setState({ step: parseInt(this.state.step) + 1 }, () => {
        banner.gotoAndStop(this.state.step)
      })
    }, 30)
  }

  stop = () => {
    this.setState({ isPlay: false })
  }

  render() {
    const { step } = this.state

    return (
      <FlexWrap
        width="100%"
        fd="column"
      >
        <RangeVertical
          value={step}
          min={1}
          max={this.state.duration}
          onChange={this.changeTimeLine}
          width="100%"
        />
        <Text onClick={this.play}>play</Text>
        <Text onClick={this.stop}>stop</Text>
      </FlexWrap>
    )
  }
}
