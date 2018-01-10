import React, { Component } from 'react'
import styled from 'styled-components'
import {
  FlexWrap,
  CheckBox,
  ColorPicker,
  ColorPreview,
} from '../'
import { RenderTree } from './render-tree-field'
import WithUploadHoc from '../../hocs/with-upload-file'
import WithFolderTree from '../../hocs/with-folder-tree'
import { UploadBtn } from './upload-button'
import treeMenu from '../../assets/img/tree-menu.png'


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

export class ArchiveUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      borderColorPreview: false,
      borderPickerPreview: false,
      borderColor: '#fff',
      backgroundColorPreview: false,
      backgroundPickerPreview: false,
      backgroundColor: '#fff',
    }
  }

  render() {
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
              onChange={({ target }) => {

              }}
            />
            <CheckBox
              id="rubber"
              type="radio"
              label="Резина"
              name="format"
              onChange={({ target }) => {

              }}
            />
            <CheckBox
              id="border"
              type="checkbox"
              label="Добавить border"
              name="border"
              onChange={({ target }) => {
                this.setState({
                  borderColorPreview: !this.state.borderColorPreview,
                })
              }}
            />
            {this.state.borderColorPreview && <ColorPreview
              color={this.state.borderColor}
              onClick={() => {
                this.setState({ borderPickerPreview: !this.state.borderPickerPreview })
              }}
            />}
            {this.state.borderPickerPreview && this.state.borderColorPreview && <ColorPicker
              onChangeComplete={(({ hex }) => {
                this.setState({ borderColor: hex })
              })}
            />}
            <CheckBox
              id="bg"
              type="checkbox"
              label="Заменить цвет заднего фона"
              name="bg"
              onChange={({ target }) => {
                this.setState({
                  backgroundColorPreview: !this.state.backgroundColorPreview,
                })
              }}
            />
            {this.state.backgroundColorPreview && <ColorPreview
              color={this.state.backgroundColor}
              onClick={() => {
                this.setState({ backgroundPickerPreview: !this.state.backgroundPickerPreview })
              }}
            />}
            {this.state.backgroundPickerPreview && this.state.backgroundColorPreview && <ColorPicker
              onChangeComplete={(({ hex }) => {
                this.setState({ backgroundColor: hex })
              })}
            />}
          </CheckBoxWrap>
        </FlexWrap>
      </FlexWrap>
    )
  }
}
