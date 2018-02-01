import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { getStub } from '../../redux/stub/selectors'
import { getFirmware } from '../../redux/firmware/selectors'
import { getState } from '../../redux/tree-folder/selectors'
import { getStateBorder } from '../../redux/banner/selectors'
import { getStateFetch } from '../../redux/stopped-banner/selectors'


class notification extends Component {
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
      border: {
        isLoading: 'Изменяю border ...',
        isError: 'Ошибка измения border',
        isSuccess: 'Изменил border',
      },
      stoppedBanner: {
        isLoading: 'Останавливаю баннер ...',
        isError: 'Ошибка остановки',
        isSuccess: 'Остановил банер',
      },
    },
  }

  componentWillReceiveProps(nextProps) {
    Object.keys(this.state.msg).forEach((key) => {
      this.notifyFormated(key, nextProps[key], this.props[key])
    })
    // this.notifyFormated('archive', nextProps.archive, this.props.archive)
    // this.notifyFormated('stub', nextProps.stub, this.props.stub)
    // this.notifyFormated('firmware', nextProps.firmware, this.props.firmware)
    // this.notifyFormated('border', nextProps.border, this.props.border)
    // this.notifyFormated('stoppedBanner', nextProps.stoppedBanner, this.props.stoppedBanner)
  }

  getError = (name, nextProps) => typeof nextProps !== 'boolean'
    ? nextProps
    : this.state.msg[name].isError

  notifyFormated = (name, nextProps, propState) => {
    if (nextProps.isLoading && !propState.isLoading) {
      toast.info(`${this.state.msg[name].isLoading}`)
    }
    if (!nextProps.isLoading
      && propState.isLoading
      && !nextProps.isError) {
      toast.success(`${this.state.msg[name].isSuccess}`)
    }
    if (nextProps.isError && !propState.isError) {
      toast.error(`${this.getError(name, nextProps.isError)}`)
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

export const Notification = connect(mapStatetoProps)(notification)
