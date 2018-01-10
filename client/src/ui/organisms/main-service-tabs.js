import React, { Component } from 'react'
import styled from 'styled-components'
import {
  FlexWrap,
} from '../'


const Button = styled.div`
  width: 180px;
  background: #3c638a;
  border-radius: 5px;
  padding: 20px 18px;
  color: #fff;
  width: 315px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  transition: .5s;
  &.active-btn {
    color: #3c638a;
    background: #fff;
  }
`
const WrapTab = styled.div`
  display: none;
  background: #fff;
  min-height: 300px;
  width: 100%;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
  margin: 20px 0;
  &.active {
    display: flex;
  }
`


export class ServicesWrapTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1,
    }
  }

  changeTab = (index) => {
    this.setState({ activeIndex: index })
  }

  render() {
    return (
      <FlexWrap
        width="100%"
        fd="column"
      >
        <FlexWrap
          width="100%"
          jc="space-between"
        >
          <Button
            onClick={() => this.changeTab(1)}
            className={this.state.activeIndex === 1 ? 'active-btn' : ''}
          >
            застопить баннер
          </Button>
          <Button
            onClick={() => this.changeTab(2)}
            className={this.state.activeIndex === 2 ? 'active-btn' : ''}
          >
            сделать заглушку
          </Button>
          <Button
            onClick={() => this.changeTab(3)}
            className={this.state.activeIndex === 3 ? 'active-btn' : ''}
          >
            оптимизировать картинки
          </Button>
        </FlexWrap>
        <FlexWrap
          width="100%"
        >
          <WrapTab className={this.state.activeIndex === 1 ? 'active' : ''}>
            tab1
          </WrapTab>
          <WrapTab className={this.state.activeIndex === 2 ? 'active' : ''}>
            tab2
          </WrapTab>
          <WrapTab className={this.state.activeIndex === 3 ? 'active' : ''}>
            tab3
          </WrapTab>
        </FlexWrap>
      </FlexWrap>
    )
  }
}
