import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputRange from 'react-input-range'
import {
  FlexWrap,
} from '../'
import { setBorderFromCanvas } from '../../redux/actions/gif'
import playIcon from '../../assets/img/play.png'
import repeatIcon from '../../assets/img/repeat.png'
/* eslint-disable  radix */

const ControllWrapp = FlexWrap.extend`
  border-radius: 0 0 5px 5px;
  background: #808080;
  padding: 25px;
  align-items: center;
  & img {
    margin: 0 25px;
    cursor: pointer;
  }
`

export class Controll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
    }
  }

  play = () => {}

  stop = () => {}

  render() {
    return (
      <ControllWrapp
        className="controllrange"
        width="100%"
      >
        <img
          alt="play"
          src={playIcon}
        />
        <img
          alt="repat"
          src={repeatIcon}
        />
        <InputRange
          formatLabel={value => `${value}мск`}
          maxValue={20}
          minValue={0}
          value={this.state.step}
          onChange={step => this.setState({ step })}
        />
      </ControllWrapp>
    )
  }
}

export const ControllWithHoc = connect(
  state => ({
    w: state.gifs.w,
    h: state.gifs.h,
    nameFolder: state.archiveUpload.treeFolders.name,
    nameFile: state.archiveUpload.nameHtml,
  }),
  dispatch => ({
    onSetBorder: (data) => {
      dispatch(setBorderFromCanvas(data))
    },
  }),
)(Controll)
