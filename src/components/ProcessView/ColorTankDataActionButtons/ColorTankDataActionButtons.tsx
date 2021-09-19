import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from 'react-tooltip-lite'
import styled from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { IState } from '../../../model/state'
import { setPaintRefilling, setPaintValveState } from '../../../store/actions/setPaints'
import { selectIsRefilling, selectIsValveOpen } from '../../../store/selectors/commonSelectors'
import { selectIsManualMode } from '../../../store/selectors/manualWorkSelectors'
import { selectIsMixerWorking } from '../../../store/selectors/mixerWorkingSelectors'
import { selectPaintDataById } from '../../../store/selectors/paintsSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import Button from '../../common/SimpleButton/SimpleButton'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'

export type IColorTankDataActionButtonsProps = {
  id: string
}

const ColorTankDataActionButtons = ({ id }: IColorTankDataActionButtonsProps) => {
  const paint = useSelector((state: IState) => selectPaintDataById(state, { id }))
  const { valve_open, refill } = paint
  const dispatch = useDispatch()
  const isProcessRunning = useSelector(selectIsProcessRunning).info
  const isMixerWorking = useSelector(selectIsMixerWorking)
  const isManualMode = useSelector(selectIsManualMode)
  
  const valveTooltipRef = useRef<Tooltip>(null)
  const refillTooltipRef = useRef<Tooltip>(null)

  const socket = useIO()

  const onToggleValve = () => {
    dispatch(setPaintValveState({
      id,
      name: paint.name,
      valve_open: !valve_open
    }, socket))
  }

  const onRefillTank = () => {
    dispatch(setPaintRefilling({
      id,
      name: paint.name,
      refilling: !refill
    }, socket))
  }

  useEffect(() => {
    if (!isProcessRunning && !isMixerWorking && isManualMode) {
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
          <TooltipContent>
            { isProcessRunning || isMixerWorking ? 'Nie możesz edytować trwajacego procesu' : 'Nie można otworzć zaworu ręcznie w trybie automatycznym' }
          </TooltipContent>  
        }
        useHover={isProcessRunning || isMixerWorking || !isManualMode}
        useDefaultStyles
      >
        <Button 
          onClick={!isProcessRunning && isManualMode ? onToggleValve : () => {}}
          isDisabled={isProcessRunning || isMixerWorking || !isManualMode}
        >
          {valve_open ? 'Zamknij' : 'Otwórz'} Zawór
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
          onClick={!isProcessRunning && !refill ? onRefillTank : () => {}}
          isDisabled={isProcessRunning}
        >
          Uzupełnij
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