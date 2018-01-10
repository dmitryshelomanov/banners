import React from 'react'
import {
  ArchiveUpload,
  FlexWrap,
  RulesWrapTabs,
} from '../'

const InnerComponent = ({ isActive, html }) => (
  <div
    className={isActive ? 'active' : ''}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export const ArchiveBlock = () => (
  <FlexWrap
    width="100%"
  >
    <ArchiveUpload />
    <RulesWrapTabs
      tabs={[
        { component: <InnerComponent />, title: 'gdn', html: '<p>component1</p>' },
        { component: <InnerComponent />, title: 'yandex', html: '<p>component2</p>' },
        { component: <InnerComponent />, title: 'dbm', html: '<p>component3</p>' },
      ]}
    />
  </FlexWrap>
)
