import React from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
  Carousel,
  CarouselItem,
  ChangeImage,
  Button,
} from '../'
import WithActiveImage from '../../hocs/with-active-image'
import { getCarouselData } from '../../redux/carousel/selectors'


const ItemWithActive = WithActiveImage(CarouselItem)

const CompressImageWrap = ({ carousel }) => (
  <FlexWrap
    w="100%"
    fd="column"
    ai="center"
  >
    <FlexWrap
      w="100%"
      style={{ marginBottom: 25 }}
    >
      <Button
        text="Восстановить исходное качество"
        className="active-btn"
        thirty
      />
    </FlexWrap>
    <Carousel
      component={<ItemWithActive />}
      carousel={carousel}
      width={180}
    />
    <ChangeImage />
  </FlexWrap>
)

const mapStateToProps = (state, props) => ({
  carousel: getCarouselData(state, props),
})

export const CompressImage = connect(mapStateToProps)(CompressImageWrap)
