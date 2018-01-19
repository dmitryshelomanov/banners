import React from 'react'
import { connect } from 'react-redux'
import {
  RootContainer,
  ArchiveBlockWithHoc,
  Caption,
  FlexWrap,
  ShowBannerWithArchive,
  ServicesWrapTabs,
  PublicComponent,
} from '../ui'

const H1 = Caption.extend`
  width: 100%;
  text-align: center;
  color: #3c638a;
  font-size: 40px
`

const MainPage = ({ archiveReady, playerReady }) => (
  <RootContainer>
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

export const Main = connect(state => ({
  archiveReady: state.archiveUpload.archiveReady,
  playerReady: state.player.playerReady,
}))(MainPage)
