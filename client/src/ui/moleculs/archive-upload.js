import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import InputNumber from 'rc-input-number'
import {
  FlexWrap,
  CheckBox,
  ColorPicker,
  ColorPreview,
} from '../'
import { toggleFixedState, resizeClearState } from '../../redux/actions/resize'
import { RenderTree } from './render-tree-field'
import WithUploadHoc from '../../hocs/with-upload-file'
import WithFolderTree from '../../hocs/with-folder-tree'
import { UploadBtn } from './upload-button'
import treeMenu from '../../assets/img/tree-menu.png'
import {
  setBgPlayer,
  setBorderColor,
} from '../../redux/actions/banner'


const Button = WithUploadHoc(UploadBtn)
const RenderTreeHoc = WithFolderTree(RenderTree)

const TreeWrap = styled.div`
  display: flex;
  width: 50%;
  background: #ececec;
  margin: 25px 0;
  box-shadow: 0 14px 20px 0px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.05);
  flex-direction: column;
  & p {
    color: #8c8c8c;
    padding-left: 15px
  }
  & .head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    box-shadow: 0 14px 20px 0px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-bottom: 15px;
    text-transform: uppercase;
    border-radius: 5px;
    color: #262626;
  }
  & .head img {
    margin-right: 20px
  }
`

const CheckBoxWrap = FlexWrap.extend`
  margin: 25px 0;
  width: 50%;
  padding-left: 20px;
  box-sizing: border-box;
  flex-direction: column;
`

const BorderChangeWrap = FlexWrap.extend`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

export class ArchiveUploadWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      borderColorPreview: false,
      borderPickerPreview: false,
      backgroundColorPreview: false,
      backgroundPickerPreview: false,
    }
  }

  render() {
    const {
      playerReady,
      bodyColor, setBgColor,
      onSetBorderColor,
      borderColor,
      onToggleFixedState,
      resize,
      onClearSizse,
    } = this.props

    return (
      <FlexWrap
        fd="column"
        width="50%"
      >
        <Button
          text="Загрузить архив с баннером"
        />
        <FlexWrap
          width="100%"
        >
          <TreeWrap>
            <div className="head">
              <img alt="menu" src={treeMenu} />
              структура архива
            </div>
            <RenderTreeHoc />
          </TreeWrap>
          <CheckBoxWrap>
            <CheckBox
              id="fix"
              type="radio"
              label="Фиксированный формат"
              name="format"
              checked={resize.isFixed}
              disabled={!playerReady}
              onChange={({ target }) => {
                onClearSizse()
              }}
            />
            <CheckBox
              id="rubber"
              type="radio"
              label="Резина"
              name="format"
              checked={!resize.isFixed}
              disabled={!playerReady}
              onChange={({ target }) => {
                onToggleFixedState(false)
              }}
            />
            <CheckBox
              id="border"
              type="checkbox"
              label="Добавить border"
              name="border"
              disabled={!playerReady}
              onChange={({ target }) => {
                if (!target.checked) {
                  onSetBorderColor('transparent')
                }
                this.setState({
                  borderColorPreview: !this.state.borderColorPreview,
                })
              }}
            />
            {this.state.borderColorPreview && (
              <BorderChangeWrap>
                <ColorPreview
                  color={borderColor}
                  onClick={() => {
                    this.setState({ borderPickerPreview: !this.state.borderPickerPreview })
                  }}
                />
                <InputNumber
                  min={1}
                  max={10}
                  step={1}
                />
              </BorderChangeWrap>
            )}
            {this.state.borderPickerPreview && this.state.borderColorPreview && <ColorPicker
              onChangeComplete={(({ hex }) => {
                onSetBorderColor(hex)
              })}
            />}
            <CheckBox
              id="bg"
              type="checkbox"
              label="Заменить цвет заднего фона"
              name="bg"
              disabled={!playerReady}
              onChange={({ target }) => {
                this.setState({
                  backgroundColorPreview: !this.state.backgroundColorPreview,
                })
              }}
            />
            {this.state.backgroundColorPreview && <ColorPreview
              color={bodyColor}
              onClick={() => {
                this.setState({ backgroundPickerPreview: !this.state.backgroundPickerPreview })
              }}
            />}
            {this.state.backgroundPickerPreview && this.state.backgroundColorPreview && <ColorPicker
              onChangeComplete={({ hex }) => setBgColor(hex)}
            />}
          </CheckBoxWrap>
        </FlexWrap>
      </FlexWrap>
    )
  }
}

export const ArchiveUpload = connect(
  state => ({
    playerReady: state.player.playerReady,
    bodyColor: state.player.bodyColor,
    borderColor: state.player.borderColor,
    resize: state.resize,
  }),
  dispatch => ({
    setBgColor: (hex) => {
      dispatch(setBgPlayer(hex))
    },
    onSetBorderColor: (hex) => {
      dispatch(setBorderColor(hex))
    },
    onToggleFixedState: (state) => {
      dispatch(toggleFixedState(state))
    },
    onClearSizse: () => {
      dispatch(resizeClearState())
    },
  }),
)(ArchiveUploadWrapper)
