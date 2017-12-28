import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'


export class ColorPicker extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { color, onChangeComplete } = this.props

    return (
      <SketchPicker
        color={color}
        onChangeComplete={onChangeComplete}
      />
    )
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  onChangeComplete: PropTypes.func.isRequired,
}

ColorPicker.defaultProps = {
  color: 'black',
}
