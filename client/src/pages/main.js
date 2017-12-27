import React from 'react'
import {
  RootContainer,
  ArchiveBlock,
  CompressImage,
  FlexWrap,
  ShowBannerWithArchive,
  GifImages,
  ShowGifWithGif,
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
      <ShowGifWithGif />
    </FlexWrap>
  </RootContainer>
)
