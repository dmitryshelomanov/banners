import React from 'react'
import styled from 'styled-components'
import {
  Button,
  Text,
  CheckBox,
} from '../'


const Stopped = ({ ...rest }) => (
  <div {...rest}>
    <Text>
      Количество повторов банера
    </Text>
    <Text>
      Застопить баннер на маркере
      (установите маркер на нужном кадре)
    </Text>
    <CheckBox
      id="stopped"
      type="checkbox"
      name="stopped"
    />
    <Button
      className="active-btn"
      text="застопить"
    />
  </div>
)

export const StoppedBanner = styled(Stopped)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & p {
    font-weight: bold;
  }
  & div {
    margin: 0;
  }
`
