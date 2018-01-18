import React from 'react'
import { connect } from 'react-redux'
import {
  ArchiveUpload,
  FlexWrap,
  RulesWrapTabsWithHoc,
} from '../'

const InnerComponent = ({ isActive, html }) => (
  <div
    className={isActive ? 'active' : ''}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

const ArchiveBlock = ({ area }) => (
  <FlexWrap
    width="100%"
  >
    <ArchiveUpload />
    <RulesWrapTabsWithHoc
      component={<InnerComponent />}
      tabs={area.data}
      isLoading={area.isLoading}
      isError={area.isError}
      activeKey={area.activeKey}
    />
  </FlexWrap>
)


export const ArchiveBlockWithHoc = connect(state => ({
  area: state.area,
}))(ArchiveBlock)
