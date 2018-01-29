import React from 'react'
import styled from 'styled-components'
import updateSystem from '../../helpers/update-system'


const getStub = (weight, stub) => stub.isGif
  ? `Вес гифки ${updateSystem(weight.gif, 'kb')}`
  : `Вес заглушки ${updateSystem(weight.jpg, 'kb')}`


export const weightStub = ({ className, weight, stub }) => (
  <div className={className}>
    <span className="weight">
      {getStub(weight, stub)}
    </span>
  </div>
)

export const WeightStubDisplay = styled(weightStub)`
  & span {
    font-weight: bold;
    color: ${({ theme }) => theme.color.color13};
    margin-right: 100px;
  }
`
