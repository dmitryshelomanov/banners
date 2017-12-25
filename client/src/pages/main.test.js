import React from 'react'
import { configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { create } from 'react-test-renderer'
import { wrapProvider } from '../../__TEST__/provider-wrap'
import { store } from '../helpers/create-store'
import { Main } from './main'

/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */

configure({ adapter: new Adapter() })

describe('test page Main', () => {
  it('main page render without crash', () => {
    render(wrapProvider(Main, store))
  })

  it('shapshot Main', () => {
    const tree = create(
      wrapProvider(Main, store),
      {
        createNodeMock: el => ({
          addEventListener() {},
        }),
      },
    )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
