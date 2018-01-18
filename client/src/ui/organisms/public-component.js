import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseURL } from '../../config'
import {
  Button,
} from '../'
import { firmware } from '../../redux/actions/area'


const Public = ({
  nameFolder, dispatch, area, nameFile, isFirmware, ...rest
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

const DataSelector = (activeKey, firmwareData) => typeof firmwareData.find(i => i.areaId === activeKey) === 'undefined'

export const PublicComponent = connect(state => ({
  nameFolder: state.archiveUpload.treeFolders.name,
  nameFile: state.archiveUpload.nameHtml,
  area: state.area,
  isFirmware: DataSelector(state.area.activeKey, state.firmware.firmwareData),
}))(PublicComponentWithStyle)
