import axios from 'axios'
import { baseURL } from '../config'


class API {
  constructor() {
    this.request = axios.create({
      baseURL,
    })
  }

  /**
   * сжатие изображение по дефолту
   * @param {*} image
   */
  async compressImage(image) {
    const data = await this.request.post('compress/img', image)

    return data
  }

  /**
   * Сжатие фотографии
   * @param {*} image
   * @param {number} q
   */
  async compressActiveImage(image, q) {
    const data = await this.request.post((`compress/img?quality=${q}`, image))

    return data
  }

  /**
   * Загрузка архива на сервер
   * @param {*} file
   */
  async uploadArchive(file) {
    const data = await this.request.post('upload', file)

    return data
  }
}

export const api = new API()
