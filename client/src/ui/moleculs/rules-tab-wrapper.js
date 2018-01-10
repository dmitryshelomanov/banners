import React, { Component } from 'react'
import styled from 'styled-components'
import {
  FlexWrap,
  CheckBox,
} from '../'

const Wrapper = FlexWrap.extend`
  margin-left: 50px;
  width: 50%;
  background: #fff;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
`

const ButtonWrapper = FlexWrap.extend`
  flex-direction: column;
  background: #efefef;
  height: 100%;
  & .button-active {
    background: #fff;
    border-color: #fff
  }
`

const Button = styled.div`
  width: 180px;
  background: transparent;
  border: 1px solid #e4e4e4;
  padding: 15px 18px;
  color: #606060;
  text-transform: uppercase;
  font-weight: bold;
  transition: .5s;
`

const DataRender = FlexWrap.extend`
  flex-direction: column;
  & div {
    display: none;
  }
  & div.active {
    display: flex;
  }
`

export class RulesWrapTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }

  render() {
    return (
      <Wrapper>
        <ButtonWrapper>
          {this.props.tabs.map((el, key) => (
            <Button
              key={key}
              className={key === this.state.activeIndex ? 'button-active' : ''}
            >
              <CheckBox
                id={`rules${key}`}
                type="radio"
                label={el.title}
                name="rules"
                checked={key === this.state.activeIndex ? 'chacked' : ''}
                onChange={({ target }) => {
                  this.setState({ activeIndex: key })
                }}
              />
            </Button>
          ))}
        </ButtonWrapper>
        <DataRender>
          {this.props.tabs.map((el, index) => (
            React.cloneElement(el.component, {
              isActive: this.state.activeIndex === index,
              html: el.html,
            })
          ))}
        </DataRender>
      </Wrapper>
    )
  }
}
