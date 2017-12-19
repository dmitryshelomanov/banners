import React from 'react'
import {
  RootContainer,
  ArchiveBlock,
  CompressImage,
  FlexWrap,
  ShowBannerWithArchive,
  CarouselBtn,
  GifImages,
} from '../ui'


export const Main = () => (
  <RootContainer>
    <FlexWrap
      fd="column"
      width="100%"
    >
      <ArchiveBlock />
      <CompressImage />
      <ShowBannerWithArchive />
      <GifImages />
    </FlexWrap>
  </RootContainer>
)
