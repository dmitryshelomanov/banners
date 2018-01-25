import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCarouselData } from '../redux/carousel/selectors'
import * as types from '../redux/types'


export default (WrapClass) => {
  class WithActiveImage extends PureComponent {
    render() {
      const { ids, onSetActiveImage, carousel, ...rest } = this.props

      return (
        <WrapClass
          img={carousel.images[ids]}
          ids={ids}
          activeImage={carousel.activeImage}
          onClick={() => onSetActiveImage(ids)}
          {...rest}
        />
      )
    }
  }

  WithActiveImage.propTypes = {
    ids: PropTypes.number.isRequired,
    onSetActiveImage: PropTypes.func.isRequired,
    carousel: PropTypes.shape({
      name: PropTypes.string,
      images: PropTypes.array,
      activeImage: PropTypes.number,
    }).isRequired,
  }

  const mapStateToProps = (state, props) => ({
    carousel: getCarouselData(state, props),
  })

  const mapDispatchToProps = (dispatch) => ({
    onSetActiveImage: (ids) => {
      dispatch({ type: types.CAROUSEL_SET_ACTIVE_IMAGE, payload: ids })
    },
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveImage)
}
