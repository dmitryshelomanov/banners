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
    const data = await this.request.post(`compress/img?quality=${q}`, image)

    return data
  }

  /**
   * Сжатие gif
   * @param {*} image
   * @param {number} q
   */
  async compressGifImage(image, q) {
    const data = await this.request.post(`compress/img?quality=${q}&isGif=1`, image)

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

  /**
   * Загрузка изображения для гиф
   * @param {*} base64
   */
  async uploadImageForGif(base64) {
    const data = await this.request.post('upload/image', base64)

    return data
  }

  /**
   * Генерация гиф
   * @param {*} imgDat
   * @param {*} nameFolde
   */
  async gifGenerated(imgData, nameFolder) {
    const data = await this.request.post('gif/generated', {
      imgData,
      nameFolder,
    })

    return data
  }

  async renameHtmlFile(data) {
    const resolve = await this.request.post('archive/name-update', data)

    return resolve
  }

  async unload(nameFolder) {
    try {
      const resolve = await this.request.post('cache/delete', {
        nameFolder,
      })

      console.log('unload')
      return resolve
    }
    catch (error) {
      throw error
    }
  }
}

export const api = new API()
