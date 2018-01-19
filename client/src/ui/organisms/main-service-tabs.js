import React, { Component } from 'react'
import styled from 'styled-components'
import {
  FlexWrap,
  GifImages,
  CompressImage,
  Button,
  StoppedBanner,
} from '../'

const WrapTab = styled.div`
  display: none;
  background: #fff;
  width: 100%;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
  margin: 20px 0;
  flex-direction: column;
  padding: 25px;
  box-sizing: border-box;
  &.active {
    display: flex;
  }
`


export class ServicesWrapTabs extends Component {
  state = {
    activeIndex: 1,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.activeIndex !== this.state.activeIndex
  }

  changeTab = (index) => {
    this.setState({ activeIndex: index })
  }

  render() {
    return (
      <FlexWrap
        w="100%"
        fd="column"
      >
        <FlexWrap
          w="100%"
          jc="space-between"
        >
          <Button
            onClick={() => this.changeTab(1)}
            text="застопить баннер"
            secondary
            thirty={this.state.activeIndex === 1}
          />
          <Button
            onClick={() => this.changeTab(2)}
            text="сделать заглушку"
            secondary
            thirty={this.state.activeIndex === 2}
          />
          <Button
            onClick={() => this.changeTab(3)}
            text="оптимизировать картинки"
            secondary
            thirty={this.state.activeIndex === 3}
          />
        </FlexWrap>
        <FlexWrap
          w="100%"
        >
          <WrapTab className={this.state.activeIndex === 1 ? 'active' : ''}>
            <StoppedBanner />
          </WrapTab>
          <WrapTab className={this.state.activeIndex === 2 ? 'active' : ''}>
            <GifImages />
          </WrapTab>
          <WrapTab className={this.state.activeIndex === 3 ? 'active' : ''}>
            <CompressImage />
          </WrapTab>
        </FlexWrap>
      </FlexWrap>
    )
  }
}
