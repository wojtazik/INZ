import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from 'react-tooltip-lite'
import styled, { css } from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { setCleaningSubstanceRefilling } from '../../../store/actions/setCleaningSubstance'
import { setPaintsRefilling } from '../../../store/actions/setPaints'
import { setProcessRunning } from '../../../store/actions/setProcessRunning'
import { selectCleaningSubstance } from '../../../store/selectors/cleaningSubstanceSelectors'
import { selectIsMixerWorking } from '../../../store/selectors/mixerWorkingSelectors'
import { selectMixingTank, selectVolumeToGain } from '../../../store/selectors/mixingTankSelectors'
import { selectPaints } from '../../../store/selectors/paintsSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'

const ProcessData = () => {
  const processRunning = useSelector(selectIsProcessRunning)
  const paints = useSelector(selectPaints)
  const cleaningSubstance = useSelector(selectCleaningSubstance)
  const mixingTank = useSelector(selectMixingTank)
  const isMixerWorking = useSelector(selectIsMixerWorking)

  const [errors, setErrors] = useState<Array<string>>([])

  const socket = useIO()
  const tooltipRef = useRef<Tooltip>(null)

  const dispatch = useDispatch()

  const renderTooltipErrors = useCallback(() => (
    <TooltipContent>
      {errors.map((error: string) => (
        <li>{error}</li>
      ))}
    </TooltipContent>
  ), [errors])

  const onSetAllRefilling = () => {
    const isAnyPaintsValveOpen = paints.find((paint) => paint.valve_open === true) 
    const isCleaningSubstanceValveOpen = cleaningSubstance.valve_open
    if (!processRunning && !isAnyPaintsValveOpen && !isCleaningSubstanceValveOpen) {
      dispatch(setPaintsRefilling(socket))
      dispatch(setCleaningSubstanceRefilling(!cleaningSubstance.refill, socket))
    }
  }

  const onSetProcessRunning = () => {
    dispatch(setProcessRunning(true, socket))
  }

  useEffect(() => {
    const anyValveAreOpen = paints.find((paint) => paint.valve_open === true)
    const anyPaintAreNotEnoughtLiters = paints.find((paint) => paint.current_volume_liters < paint.count_liters)
    const isEnoughCleaningSubstance = cleaningSubstance.current_volume === mixingTank.capacity
    const isCleaningSubstanceValveOpen = cleaningSubstance.valve_open === true
    const isRefillingSomePaintTank = paints.find((paint) => paint.refill === true)
    const isRefillingCleaningSubstanceTank = cleaningSubstance.refill

    const errorsNew = []

    if (processRunning) errorsNew.push('Nie można wystartować. Proces w toku')
    if (anyValveAreOpen) errorsNew.push('Otwarty zawór. Sprawdź zamknięcie zaworów zbiorników farb')
    if (anyPaintAreNotEnoughtLiters) errorsNew.push('Za mało materiału. Sprawdź stan zbiorników farb')
    if (!isEnoughCleaningSubstance) errorsNew.push('Zbyt mało substancji czyszczącej')
    if (isCleaningSubstanceValveOpen) errorsNew.push('Otwarty zawór. Sprawdź zamknięcie zbiornika substancji czyszczącej')
    if (isMixerWorking) errorsNew.push('Nie można wystartować. Mieszadło jest w ruchu')
    if (isRefillingSomePaintTank) errorsNew.push('Nie można wystartować. Trwa uzupełnianie zbiornika z farbą')
    if (isRefillingCleaningSubstanceTank) errorsNew.push('Nie można wystartować. Trwa uzupełnianie substancji czyszczącej')

    setErrors(errorsNew)

    if (errorsNew.length === 0) {
      // @ts-ignore
      tooltipRef.current?.hideTip()
    }
  }, [
    cleaningSubstance.current_volume,
    cleaningSubstance.refill,
    cleaningSubstance.valve_open,
    isMixerWorking,
    mixingTank.capacity,
    paints,
    processRunning
  ])

  return (
    <ProcessDataWrapper>
      <Tooltip
        ref={tooltipRef}
        content={errors.length > 0 && renderTooltipErrors()}
        useDefaultStyles
        useHover={errors.length > 0}
      >
        <StartButton
          disabled={errors.length > 0}
          isRunning={processRunning}
          canStart={errors.length === 0}
          onClick={errors.length === 0 ? onSetProcessRunning : undefined}
        >
          Uruchom proces
        </StartButton>
      </Tooltip>
      <StopButton disabled={!processRunning} isRunning={!processRunning}>Zatrzymaj proces</StopButton>  
      <RefillAllButton
        disabled={processRunning}
        isRunning={processRunning}
        onClick={onSetAllRefilling}
      >Uzupełnij wszystkie</RefillAllButton>  
    </ProcessDataWrapper>
  )
}

const ProcessDataWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

type ProcessRunningProps = {
  isRunning: boolean
}

type StartButtonProps = {
  isRunning: boolean
  canStart: boolean
}

const BaseButton = styled.button`
  font-size: ${fonts.FONT_LARGEST_SIZE};
  padding: 10px 15px;
  color: white;
  border: none;
  outline: none;
  min-width: 280px;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all .3s;
  position: relative;
`

const StartButton = styled(BaseButton)<StartButtonProps>`
  background: ${colors.GREEN_DARKEN};
  box-shadow: 1px 1px 8px ${colors.GREEN_DARKEN};
  width: 100%;

  &:hover {
    background: ${colors.GREEN_BASIC};
  }

  ${({ isRunning, canStart }) => (isRunning || !canStart) && css`
    cursor: default;

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(100,100,100,.8);
      left: 0;
      top: 0;
    }

    &:hover {
      background: ${colors.GREEN_DARKEN};
    }
  `}
`

const StopButton = styled(BaseButton)<ProcessRunningProps>`
  background: ${colors.RED_BASIC};
  box-shadow: 1px 1px 8px ${colors.RED_BASIC};

  &:hover {
    background: ${colors.ERROR_RED};
  }

  ${({ isRunning }) => isRunning && css`
    cursor: default;

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(100,100,100,.8);
      left: 0;
      top: 0;
    }

    &:hover {
      background: ${colors.RED_BASIC};
    }
  `}
`

const RefillAllButton = styled(BaseButton)<ProcessRunningProps>`
  background: ${colors.NAVY_BLUE};
  box-shadow: 1px 1px 8px ${colors.NAVY_BLUE};

  &:hover {
    background: ${colors.BLUE_LIGHTEN};
  }

  ${({ isRunning }) => isRunning && css`
    cursor: default;

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(100,100,100,.8);
      left: 0;
      top: 0;
    }

    &:hover {
      background: ${colors.NAVY_BLUE};
    }
  `}
`

export default ProcessData