import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from 'react-tooltip-lite'
import styled from 'styled-components'
import { IState } from '../../../model/state'
import { setPaintValveState } from '../../../store/actions/setPaints'
import { selectIsValveOpen } from '../../../store/selectors/commonSelectors'
import { selectIsMixerWorking } from '../../../store/selectors/mixerWorkingSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import Button from '../../common/SimpleButton/SimpleButton'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'

export type IColorTankDataActionButtonsProps = {
  id: string
}

const ColorTankDataActionButtons = ({ id }: IColorTankDataActionButtonsProps) => {
  const isValveOpen = useSelector((state: IState) => selectIsValveOpen(state, { id }))
  const dispatch = useDispatch()
  const isProcessRunning = useSelector(selectIsProcessRunning)
  const isMixerWorking = useSelector(selectIsMixerWorking)
  
  const valveTooltipRef = useRef<Tooltip>(null)
  const refillTooltipRef = useRef<Tooltip>(null)

  const onToggleValve = () => {
    dispatch(setPaintValveState({
      id,
      valve_open: !isValveOpen
    }))
  }

  const onRefillTank = () => {
  }

  useEffect(() => {
    if (!isProcessRunning && !isMixerWorking) {
      // @ts-ignore
      valveTooltipRef.current?.hideTip()
    }
    if (!isProcessRunning) {
      // @ts-ignore
      refillTooltipRef.current?.hideTip()
    }
  }, [isProcessRunning, isMixerWorking])

  return (
    <ButtonsWrapper>
      <Tooltip
        ref={valveTooltipRef}
        content={
          <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>  
        }
        useHover={isProcessRunning || isMixerWorking}
        useDefaultStyles
      >
        <Button 
          onClick={isProcessRunning ? onToggleValve : () => {}}
          isDisabled={isProcessRunning || isMixerWorking}
        >
          {isValveOpen ? 'Close' : 'Open'} Valve
        </Button>
      </Tooltip>
      <Tooltip
        ref={refillTooltipRef}
        content={
          <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>  
        }
        useHover={isProcessRunning}
        useDefaultStyles
      >
        <Button
          onClick={isProcessRunning ? onRefillTank : () => {}}
          isDisabled={isProcessRunning}
        >
          Refill
        </Button>
      </Tooltip>

    </ButtonsWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: auto;
`

export default ColorTankDataActionButtons