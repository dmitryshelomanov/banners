import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { getStub } from '../../redux/stub/selectors'
import { getFirmware } from '../../redux/firmware/selectors'
import { getState } from '../../redux/tree-folder/selectors'
import { getStateBorder } from '../../redux/banner/selectors'
import { getStateFetch } from '../../redux/stopped-banner/selectors'


class Wrapper extends Component {
  state = {
    msg: {
      archive: {
        isLoading: 'Загружаю архив ...',
        isError: 'Ошибка загрузки архива',
        isSuccess: 'Загрузил',
        msg: '',
      },
      stub: {
        isLoading: 'Заглушка генерируется',
        isError: 'Ошибка генерации заглушки',
        isSuccess: 'Заглушка готова',
        msg: '',
      },
      firmware: {
        isLoading: 'Прошиваю ...',
        isError: 'Ошибка прошивки',
        isSuccess: 'Прошил',
        msg: '',
      },
      border: {
        isLoading: 'Изменяю border ...',
        isError: 'Ошибка измения border',
        isSuccess: 'Изменил border',
        msg: '',
      },
      stoppedBanner: {
        isLoading: 'Останавливаю баннер ...',
        isError: 'Ошибка остановки',
        isSuccess: 'Остановил банер',
        msg: '',
      },
    },
  }

  componentWillReceiveProps(nextProps) {
    this.notifyFormated('archive', nextProps.archive, this.props.archive)
    this.notifyFormated('stub', nextProps.stub, this.props.stub)
    this.notifyFormated('firmware', nextProps.firmware, this.props.firmware)
    this.notifyFormated('border', nextProps.border, this.props.border)
    this.notifyFormated('stoppedBanner', nextProps.stoppedBanner, this.props.stoppedBanner)
  }

  notifyFormated = (name, nextState, propState) => {
    if (nextState.isLoading && !propState.isLoading) {
      toast.info(`${this.state.msg[name].isLoading} ${this.state.msg[name].msg}`)
    }
    if (!nextState.isLoading
      && propState.isLoading
      && !nextState.isError) {
      toast.success(`${this.state.msg[name].isSuccess} ${this.state.msg[name].msg}`)
    }
    if (nextState.isError && !propState.isError) {
      toast.error(`${this.state.msg[name].isError} ${this.state.msg[name].msg}`)
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
  border: getStateBorder(state),
  stoppedBanner: getStateFetch(state),
})

export const Notification = connect(mapStatetoProps)(Wrapper)
