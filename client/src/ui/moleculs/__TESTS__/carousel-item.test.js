import React from 'react'
import { configure, render, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { create } from 'react-test-renderer'
import { CarouselItem } from '../carousel-item'

/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */

configure({ adapter: new Adapter() })

let props
let withInfo
let withoutInfo

beforeEach(() => {
  withInfo = {
    url: 'path_to_image',
    info: {
      percentCompress: 0,
    },
  }
  withoutInfo = {
    url: 'path_to_image',
    info: null,
  }
  props = (info = true) => ({
    activeImage: 1,
    ids: 0,
    width: '240px',
    img: info ? withInfo : withoutInfo,
  })
})

describe('test component CarouselItem', () => {
  it('CarouselItem render without crash', () => {
    render(<CarouselItem {...props()} />)
  })

  it('CarouselItem render with info', () => {
    const wrapper = shallow(<CarouselItem {...props()} />)
    const { img } = wrapper.instance().props

    expect(img).toBe(withInfo)
  })

  it('CarouselItem render without info', () => {
    const wrapper = shallow(<CarouselItem {...props(false)} />)
    const { img } = wrapper.instance().props

    expect(img).toBe(withoutInfo)
  })

  it('CarouselItem props is equals', () => {
    const data = props(false)
    const wrapper = shallow(<CarouselItem {...data} />)
    const { img, activeImage, width, ids } = wrapper.instance().props

    expect(img).toBe(data.img)
    expect(activeImage).toBe(data.activeImage)
    expect(width).toBe(data.width)
    expect(ids).toBe(data.ids)
  })

  it.skip('shapshot Button', () => {
    const tree = create(<CarouselItem {...props()} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
