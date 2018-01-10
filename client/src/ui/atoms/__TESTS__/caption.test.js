import React from 'react'
import { configure, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { create } from 'react-test-renderer'
import { Caption } from '../caption'

/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */

configure({ adapter: new Adapter() })

describe('test component Caption', () => {
  it('Caption render without crash', () => {
    render(<Caption size={10} />)
  })

  it('size props test', () => {
    const wrapper = shallow(<Caption size={10} />)
    const { size } = wrapper.instance().props

    expect(size).toBe(10)
  })

  it.skip('shapshot Button', () => {
    const tree = create(<Caption size={10} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
