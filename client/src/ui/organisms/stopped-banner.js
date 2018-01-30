import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getStoppedState } from '../../redux/stopped-banner/selectors'
import { setStoppedState } from '../../redux/stopped-banner/actions'
import { getArchiveName, getArchiveFileName } from '../../redux/tree-folder/selectors'
import Emitter from '../../helpers/emitter'
import {
  Button,
  Text,
  CheckBox,
} from '../'


class Stopped extends Component {
  constructor(props) {
    super(props)
    this.emitter = Emitter.getInstance()
  }

  render() {
    const { isStopped, onSetStoppedState, nameFolder, nameFile, ...rest } = this.props

    return (
      <div {...rest}>
        <Text>
          Количество повторов банера
        </Text>
        <Text>
          Застопить баннер на маркере
          (установите маркер на нужном кадре)
        </Text>
        <CheckBox
          id="stopped"
          type="checkbox"
          name="stopped"
          checked={isStopped}
          onChange={() => {
            const { time, duration } = this.emitter.emit('get:time:data')

            onSetStoppedState({
              isStopped: !isStopped,
              time,
              nameFolder,
              nameFile,
              duration,
            })
          }}
        />
        <Button
          className="active-btn"
          text="застопить"
          thirty
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isStopped: getStoppedState(state),
  nameFolder: getArchiveName(state),
  nameFile: getArchiveFileName(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSetStoppedState: (data) => {
    dispatch(setStoppedState(data))
  },
})


const StoppedWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stopped)

export const StoppedBanner = styled(StoppedWithConnect)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & p {
    font-weight: bold;
  }
  & div {
    margin: 0;
  }
`
