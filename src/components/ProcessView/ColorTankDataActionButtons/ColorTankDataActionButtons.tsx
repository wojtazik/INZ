import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { IState } from '../../../model/state'
import { setPaintValveState } from '../../../store/actions/setPaints'
import { selectIsValveOpen } from '../../../store/selectors/commonSelectors'
import colors from '../../../styles/colors'

export type IColorTankDataActionButtonsProps = {
  id: string
}

const ColorTankDataActionButtons = ({ id }: IColorTankDataActionButtonsProps) => {

  const isValveOpen = useSelector((state: IState) => selectIsValveOpen(state, { id }))

  const dispatch = useDispatch()

  const onToggleValve = () => {
    dispatch(setPaintValveState({
      id,
      valve_open: !isValveOpen
    }))
  }

  return (
    <ButtonsWrapper>
      <Button onClick={onToggleValve}>
        {isValveOpen ? 'Close' : 'Open'} Valve
      </Button>
      <Button>Refill</Button>
    </ButtonsWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Button = styled.button`
  margin-bottom: 10px;
  padding: 8px 3px;
  background: transparent;
  border-radius: 5px;
  color: ${colors.GRAY_BASIC_DARK};
  border: 1px solid ${colors.GRAY_BASIC_DARK};
  cursor: pointer;
  transition: all .3s;
  min-width: 80px;

  &:hover,
  &:active,
  &:visited,
  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(80, 80, 80, .1);
  }
`

export default ColorTankDataActionButtons