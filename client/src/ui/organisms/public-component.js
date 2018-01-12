import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { connect } from 'react-redux'
import { baseURL } from '../../config'
import {
  Button,
} from '../'


const Public = ({ nameFolder, ...rest }) => (
  <div {...rest}>
    <Button
      className="btn"
      text="прошить"
    />
    <Button
      className="btn"
      text="опубликовать"
      onClick={async () => {
        const { data } = await axios.post(`${baseURL}download/archive`, { nameFolder })

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

export const PublicComponent = connect(state => ({
  nameFolder: state.archiveUpload.treeFolders.name,
}))(PublicComponentWithStyle)
