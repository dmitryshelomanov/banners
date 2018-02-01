import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseURL } from '../../config'
import {
  Button,
} from '../'
import { firmware } from '../../redux/area/actions'
import { getGifSize } from '../../redux/gif/selectors'
import { getStub } from '../../redux/stub/selectors'
import { getArchiveName, getArchiveFileName } from '../../redux/tree-folder/selectors'
import { getResize } from '../../redux/resize/selectors'
import { getArea } from '../../redux/area/selectors'
import { getIsFirmware } from '../../redux/firmware/selectors'


const Public = ({
  nameFolder, dispatch, area, nameFile, isFirmware, stub, gifSize, resize, ...rest
}) => (
  <div {...rest}>
    <Button
      className="btn"
      text="прошить"
      onClick={() => {
        dispatch(firmware({
          nameFolder,
          fileName: nameFile,
          areaId: area.activeKey,
          isGif: stub.isGif,
        }))
      }}
    />
    <Button
      className="btn"
      text="опубликовать"
      disabled={isFirmware}
      onClick={async () => {
        const { data } = await axios.post(`${baseURL}api/download/archive`, {
          nameFolder,
          areaName: area.data.find(el => el.id === area.activeKey).name,
          isGif: stub.isGif,
          w: resize.isFixed ? gifSize.gifW : resize.minimalW,
          h: resize.isFixed ? gifSize.gifH : resize.minimalH,
        })

        window.open(`${baseURL}download-ready/${data}`)
      }}
    />
  </div>
)

export const PublicComponentWithStyle = styled(Public)`
  display: flex;
  background: #fff;
  width: 100%;
  box-shadow: 0 14px 20px 0px rgba(0,0,0,0.04), 0 10px 10px rgba(0,0,0,0.05);
  margin: 20px 0;
  padding: 25px;
  box-sizing: border-box;
  & .btn {
    margin-right: 25px
  }
`

const mapStateToProps = (state) => ({
  nameFolder: getArchiveName(state),
  nameFile: getArchiveFileName(state),
  area: getArea(state),
  isFirmware: getIsFirmware(state),
  stub: getStub(state),
  gifSize: getGifSize(state),
  resize: getResize(state),
})

export const PublicComponent = connect(mapStateToProps)(PublicComponentWithStyle)
