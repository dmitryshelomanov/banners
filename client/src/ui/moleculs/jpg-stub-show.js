import React, { Component } from 'react'
import styled from 'styled-components'
import InputRange from 'react-input-range'
import { connect } from 'react-redux'
import { getStub } from '../../redux/stub/selectors'
import emitter from '../../helpers/emitter'


class JpgStub extends Component {
  state = {
    q: 1,
  }

  render() {
    const { stub, className } = this.props

    return (
      <div className={`${className} jpgstub`}>
        <img
          alt="stub"
          src={stub.jpgStub}
        />
        <InputRange
          value={this.state.q}
          minValue={0}
          maxValue={1}
          step={0.1}
          onChange={(value) => {
            this.setState({ q: value }, () => {
              emitter.emit('set-stub-jpg', value)
            })
          }}
        />
      </div>
    )
  }
}

const stubWithStyles = styled(JpgStub)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 25px;
  flex-direction: column;
  align-items: center;
  & img {
    margin-bottom: 20px;
  }
`

const mapStateToProps = (state) => ({
  stub: getStub(state),
})

export const JpgStubShow = connect(mapStateToProps)(stubWithStyles)
