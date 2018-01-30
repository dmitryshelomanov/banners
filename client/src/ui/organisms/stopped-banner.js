import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getStoppedState } from '../../redux/stopped-banner/selectors'
import { setStoppedState } from '../../redux/stopped-banner/actions'
import {
  Button,
  Text,
  CheckBox,
} from '../'


const Stopped = ({ isStopped, onSetStoppedState, ...rest }) => (
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
        onSetStoppedState(!isStopped, 580)
      }}
    />
    <Button
      className="active-btn"
      text="застопить"
      thirty
    />
  </div>
)

const mapStateToProps = (state) => ({
  isStopped: getStoppedState(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSetStoppedState: (state, times) => {
    dispatch(setStoppedState(state, times))
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
