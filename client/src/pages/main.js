import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  RootContainer,
  ArchiveBlockWithHoc,
  Caption,
  FlexWrap,
  ShowBannerWithArchive,
  ServicesWrapTabs,
  PublicComponent,
  Notification,
} from '../ui'
import { getArchiveReadyState } from '../redux/tree-folder/selectors'
import { getPlayerReadyState } from '../redux/banner/selectors'


const H1 = Caption.extend`
  width: 100%;
  text-align: center;
  color: #3c638a;
  font-size: 40px
`

const MainPage = ({ archiveReady, playerReady }) => (
  <RootContainer>
    <Notification />
    <FlexWrap
      fd="column"
      w="100%"
    >
      <H1>
        ПРОШИВКА БАННЕРОВ ОТ ASAP
      </H1>
      <ArchiveBlockWithHoc />
      {archiveReady && (
        <ShowBannerWithArchive
          archiveReady={archiveReady}
        />
      )}
      {playerReady && archiveReady && (
        <FlexWrap
          fd="column"
          w="100%"
        >
          <ServicesWrapTabs
            playerReady={playerReady}
          />
          <PublicComponent />
        </FlexWrap>
      )}
    </FlexWrap>
  </RootContainer>
)

const mapStateToProps = (state, props) => ({
  archiveReady: getArchiveReadyState(state),
  playerReady: getPlayerReadyState(state),
})

export const Main = connect(mapStateToProps)(MainPage)
