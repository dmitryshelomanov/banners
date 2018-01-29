import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { getStub } from '../../redux/stub/selectors'
import { getFirmware } from '../../redux/firmware/selectors'
import { getState } from '../../redux/tree-folder/selectors'


class Wrapper extends Component {
  state = {
    msg: {
      archive: {
        isLoading: 'Загружаю архив ...',
        isError: 'Ошибка загрузки архива',
        isSuccess: 'Загрузил',
      },
      stub: {
        isLoading: 'Заглушка генерируется',
        isError: 'Ошибка генерации заглушки',
        isSuccess: 'Заглушка готова',
      },
      firmware: {
        isLoading: 'Прошиваю ...',
        isError: 'Ошибка прошивки',
        isSuccess: 'Прошил',
      },
    },
  }

  componentWillReceiveProps(nextProps) {
    this.notifyFormated('archive', nextProps.archive, this.props.archive)
    this.notifyFormated('stub', nextProps.stub, this.props.stub)
    this.notifyFormated('firmware', nextProps.firmware, this.props.firmware)
  }

  notifyFormated = (name, nextState, propState) => {
    if (nextState.isLoading && !propState.isLoading) {
      toast.info(this.state.msg[name].isLoading)
    }
    if (!nextState.isLoading
      && propState.isLoading
      && !nextState.isError) {
      toast.success(this.state.msg[name].isSuccess)
    }
    if (nextState.isError && !propState.isError) {
      toast.error(this.state.msg[name].isError)
    }
  }

  render() {
    return <ToastContainer />
  }
}

const mapStatetoProps = (state) => ({
  stub: getStub(state),
  firmware: getFirmware(state),
  archive: getState(state),
})

export const Notification = connect(mapStatetoProps)(Wrapper)
