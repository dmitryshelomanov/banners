import React from 'react'
import {
  RootContainer,
  ArchiveBlock,
  Caption,
  FlexWrap,
  ShowBannerWithArchive,
  ServicesWrapTabs,
} from '../ui'

const H1 = Caption.extend`
  width: 100%;
  text-align: center;
  color: #3c638a;
  font-size: 40px
`

export const Main = () => (
  <RootContainer>
    <FlexWrap
      fd="column"
      width="100%"
    >
      <H1>
        ПРОШИВКА БАННЕРОВ ОТ ASAP
      </H1>
      <ArchiveBlock />
      <ShowBannerWithArchive />
      <ServicesWrapTabs />
    </FlexWrap>
  </RootContainer>
)
