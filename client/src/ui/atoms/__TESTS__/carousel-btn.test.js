import React from 'react'
import { configure, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { create } from 'react-test-renderer'
import { CarouselBtn } from '../carousel-btn'

/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */

configure({ adapter: new Adapter() })

describe('test component CarouselBtn', () => {
  it('CarouselBtn render without crash', () => {
    render(<CarouselBtn />)
  })

  it('isLeft props test', () => {
    const wrapper = shallow(<CarouselBtn isLeft />)
    const { isLeft } = wrapper.instance().props

    expect(isLeft).toBeTruthy()
  })

  it.skip('shapshot Button', () => {
    const tree = create(<CarouselBtn isLeft />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
