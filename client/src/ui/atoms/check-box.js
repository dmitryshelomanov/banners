import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import bg from '../../assets/img/checkbox.png'


const Wrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  & input[type="checkbox"],
    input[type="radio"] {
    display: none;
  }
  & input[type="checkbox"] + label span,
    input[type="radio"] + label span {
    display: block;
    height: 20px;
    width: 20px;
    background: #fff;
    cursor: pointer;
    background: #b8b8b8;
  }
  & input[type="checkbox"]:checked + label span,
    input[type="radio"]:checked + label span {
    background: #39628d url(${bg}) center center no-repeat;
  }
  & label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  & label div {
    color: #525252;
    margin-left: 5px;
  }
`

export const CheckBox = ({ name, id, label, type, onChange, ...rest }) => (
  <Wrapper>
    <input
      type={type}
      name={name}
      id={id}
      onChange={onChange}
      {...rest}
    />
    <label htmlFor={id}>
      <span />
      <div>{label}</div>
    </label>
  </Wrapper>
)

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
}

CheckBox.defaultProps = {
  label: '',
}
