import React from 'react'
import { configure, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { create } from 'react-test-renderer'
import { Button } from '../button'

/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */

configure({ adapter: new Adapter() })

describe('test component Button', () => {
  it('Button render without crash', () => {
    render(<Button text="upload" />)
  })

  it('text props test', () => {
    const wrapper = shallow(<Button text="upload" />)
    const { text } = wrapper.instance().props

    expect(text).toBe('upload')
  })

  it.skip('shapshot Button', () => {
    const tree = create(<Button text="upload" />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
