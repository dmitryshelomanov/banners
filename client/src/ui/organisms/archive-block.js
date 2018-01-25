import React from 'react'
import { connect } from 'react-redux'
import { getArea } from '../../redux/area/selectors'
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
    w="100%"
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

const mapStateToProps = (state, props) => ({
  area: getArea(state, props),
})

export const ArchiveBlockWithHoc = connect(mapStateToProps)(ArchiveBlock)
