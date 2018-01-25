import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
  CheckBox,
} from '../'
import {
  setActiveKey,
  getAreaInfo,
} from '../../redux/area/actions'


const Wrapper = FlexWrap.extend`
  margin-left: 50px;
  width: 50%;
  background: #fff;
  height: 400px;
  border-radius: 5px;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
  & .btn-wrapper {
    displa: flex;
    flex-direction: column;
    background: #efefef;
    height: 100%;
    & .button-active {
      background: #fff;
      border-color: #fff
    }
    & .btn-tab {
      width: 180px;
      background: transparent;
      border: 1px solid #e4e4e4;
      padding: 15px 18px;
      color: #606060;
      text-transform: uppercase;
      font-weight: bold;
      transition: .5s;
    }
  }
  & .loader {
    width: 100%;
    height: 100%;
    background: #fff url(${({ theme }) => theme.preloader}) center center no-repeat;
  }
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

class RulesWrapTabs extends Component {
  componentDidMount() {
    this.props.onGetArea()
  }

  render() {
    const { isLoading, isError } = this.props

    return (
      <Wrapper>
        {isLoading || (
          <div className="btn-wrapper">
            {this.props.tabs.map((el) => (
              <div
                key={el.id}
                className={el.id === this.props.activeKey ? 'btn-tab button-active' : 'btn-tab'}
              >
                <CheckBox
                  id={`rules${el.id}`}
                  type="radio"
                  label={el.name}
                  name="rules"
                  checked={el.id === this.props.activeKey ? 'chacked' : ''}
                  onChange={() => {
                    this.props.onSetActiveKey(el.id)
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="loader" />
        )}
        <DataRender>
          {this.props.tabs.map((el, index) => (
            React.cloneElement(this.props.component, {
              key: index,
              isActive: this.props.activeKey === el.id,
              html: el.html,
            })
          ))}
        </DataRender>
      </Wrapper>
    )
  }
}

export const RulesWrapTabsWithHoc = connect(null, (dispatch) => ({
  onGetArea: () => {
    dispatch(getAreaInfo())
  },
  onSetActiveKey: (key) => {
    dispatch(setActiveKey(key))
  },
}))(RulesWrapTabs)
