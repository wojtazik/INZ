import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from 'react-tooltip-lite'
import styled, { css } from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { IState } from '../../../model/state'
import { setCleaningSubstanceRefilling, setCleaningSubstanceValveOpen } from '../../../store/actions/setCleaningSubstance'
import { selectCleaningSubstance } from '../../../store/selectors/cleaningSubstanceSelectors'
import { selectIsValveOpen } from '../../../store/selectors/commonSelectors'
import { selectIsMixerWorking } from '../../../store/selectors/mixerWorkingSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import Button from '../../common/SimpleButton/SimpleButton'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'

const CleaningTankDataActionButtons = () => {
  const cleaningSubstanceTankData = useSelector(selectCleaningSubstance)
  const isValveOpen = useSelector((state: IState) => selectIsValveOpen(state, { id: cleaningSubstanceTankData.id }))
  const isProcessRunning = useSelector(selectIsProcessRunning).info
  const isMixerWorking = useSelector(selectIsMixerWorking)
  
  const valveTooltipRef = useRef<Tooltip>(null)
  const refillTooltipRef = useRef<Tooltip>(null)

  const socket = useIO()

  const dispatch = useDispatch()

  const onToggleValve = () => {
    dispatch(setCleaningSubstanceValveOpen(!isValveOpen, socket))
  }

  const onRefillTank = () => {
    if (!cleaningSubstanceTankData.refill) {
      dispatch(setCleaningSubstanceRefilling(!cleaningSubstanceTankData.refill, socket))
    }
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
        useHover={isProcessRunning || isMixerWorking || cleaningSubstanceTankData.refill}
        useDefaultStyles
      >
        <Button 
          onClick={!isProcessRunning ? onToggleValve : () => {}}
          isDisabled={isProcessRunning || isMixerWorking}
        >
          {isValveOpen ? 'Zamknij' : 'Otwórz'} Zawór
        </Button>
      </Tooltip>
      <Tooltip
        ref={refillTooltipRef}
        content={
          <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>  
        }
        useHover={isProcessRunning || cleaningSubstanceTankData.refill}
        useDefaultStyles
      >
        <Button
          onClick={!isProcessRunning ? onRefillTank : () => {}}
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

export default CleaningTankDataActionButtons