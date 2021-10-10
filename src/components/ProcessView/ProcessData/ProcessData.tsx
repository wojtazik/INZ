import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip from 'react-tooltip-lite'
import styled, { css } from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { IError } from '../../../model/state'
import { setCleaningSubstanceRefilling } from '../../../store/actions/setCleaningSubstance'
import { setError } from '../../../store/actions/setErrors'
import { setPaintsRefilling } from '../../../store/actions/setPaints'
import { setProcessRunning } from '../../../store/actions/setProcessRunning'
import { selectCleaningSubstance } from '../../../store/selectors/cleaningSubstanceSelectors'
import { selectErrors } from '../../../store/selectors/errorsSelectors'
import { selectIsManualMode } from '../../../store/selectors/manualWorkSelectors'
import { selectIsMixerWorking } from '../../../store/selectors/mixerWorkingSelectors'
import { selectMixingTank, selectVolumeToGain } from '../../../store/selectors/mixingTankSelectors'
import { selectIsPaintSelected, selectPaints } from '../../../store/selectors/paintsSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import usePrevious from '../../../util/hooks/usePrevious'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'

const ProcessData = () => {
  const processRunning = useSelector(selectIsProcessRunning).info
  const paints = useSelector(selectPaints)
  const cleaningSubstance = useSelector(selectCleaningSubstance)
  const mixingTank = useSelector(selectMixingTank)
  const isMixerWorking = useSelector(selectIsMixerWorking)
  const isManualWork = useSelector(selectIsManualMode)
  const isPaintSelected = useSelector(selectIsPaintSelected)
  const stateErrors = useSelector(selectErrors)

  const [errors, setErrors] = useState<Array<string>>([])

  const prevProcessRunning = usePrevious(processRunning)

  const socket = useIO()
  const tooltipRef = useRef<Tooltip>(null)
  const refillTooltipRef = useRef<Tooltip>(null)

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

  const onSetProcessRunning = (running: boolean) => {
    dispatch(setProcessRunning(running, socket))
  }

  const checkIfSomeTankRefilling = () => {
    const isRefillingSomePaintTank = !!paints.find((paint) => paint.refill === true)
    const isRefillingCleaningSubstanceTank = cleaningSubstance.refill

    return isRefillingSomePaintTank || isRefillingCleaningSubstanceTank
  }

  const checkForErrors = () => {
    paints.forEach((paint) => {
      const paintVolumeError = stateErrors.find((stateError: IError) => {
        return stateError.location === `VOLUME_${paint.name.toUpperCase()}` 
      })

      if (paint.current_volume_liters >= paint.count_liters && paintVolumeError?.is_active === true) {
        if (paintVolumeError) {
          dispatch(setError({
            ...paintVolumeError,
            is_active: false
          }))
        }
      }

      if (paint.current_volume_liters < paint.count_liters && paintVolumeError?.is_active === false) {
        if (paintVolumeError) {
          dispatch(setError({
            ...paintVolumeError,
            is_active: true,
            last_active_date: new Date()
          }))
        }
      }
    }) 
    const isRefillingSomePaintTank = paints.find((paint) => paint.refill === true)
      const refilingPaintStateError = stateErrors.find((stateError: IError) => {
        return stateError.location === 'START_WHEN_REFILLING_PAINT'
      })
      if (refilingPaintStateError) {
        if (refilingPaintStateError.is_active && !isRefillingSomePaintTank) {
          dispatch(setError({
            ...refilingPaintStateError,
            is_active: false
          }))
        }

        if (isRefillingSomePaintTank && !refilingPaintStateError.is_active) {
          dispatch(setError({
            ...refilingPaintStateError,
            is_active: true,
            last_active_date: new Date()
          }))
        }
      }

      const processRunningError = stateErrors.find((stateError: IError) => {
        return stateError.location === 'START_WHEN_PROCESS_RUNNING'
      })

      if (processRunningError) {
        if (processRunning) {
          dispatch(setError({
            ...processRunningError,
            last_active_date: new Date()
          }))
        }
      }

      const mixerWorkingError = stateErrors.find((stateError: IError) => {
        return stateError.location === 'START_WHEN_MIXER_WORKING'
      })

      if (mixerWorkingError) {
        if (isMixerWorking) {
          dispatch(setError({
            ...mixerWorkingError,
            last_active_date: new Date()
          }))
        }
      }

      const isManualModeError = stateErrors.find((stateError: IError) => {
        return stateError.location === 'START_WHEN_MANUAL_MODE'
      })

      if (isManualModeError) {
        if (isManualWork) {
          dispatch(setError({
            ...isManualModeError,
            last_active_date: new Date()
          }))
        }
      }
  }

  useEffect(() => {
    const anyValveAreOpen = paints.find((paint) => paint.valve_open === true)
    const anyPaintAreNotEnoughtLiters = paints.find((paint) => paint.current_volume_liters < paint.count_liters)
    const isEnoughCleaningSubstance = cleaningSubstance.current_volume_liters === cleaningSubstance.capacity
    const isCleaningSubstanceValveOpen = cleaningSubstance.valve_open === true
    const isRefillingSomePaintTank = paints.find((paint) => paint.refill === true)
    const isRefillingCleaningSubstanceTank = cleaningSubstance.refill
    const isMixingTimeNotSet = mixingTank.mixing_time_seconds < 30
    const isVolumeToGainNotSet = mixingTank.volume_to_gain < 1

    const errorsNew = []

    if (processRunning) errorsNew.push('Nie można wystartować. Proces w toku')
    if (anyValveAreOpen) errorsNew.push('Otwarty zawór. Sprawdź zamknięcie zaworów zbiorników farb')
    if (anyPaintAreNotEnoughtLiters) errorsNew.push('Za mało materiału. Sprawdź stan zbiorników farb')
    if (!isEnoughCleaningSubstance) errorsNew.push('Zbyt mało substancji czyszczącej')
    if (isCleaningSubstanceValveOpen) errorsNew.push('Otwarty zawór. Sprawdź zamknięcie zbiornika substancji czyszczącej')
    if (isMixerWorking) errorsNew.push('Nie można wystartować. Mieszadło jest w ruchu')
    if (isMixingTimeNotSet) errorsNew.push('Czas mieszania powinien wynosić min. 30 sekund')
    if (isVolumeToGainNotSet) errorsNew.push('Nie określono ilości farby do osiągnięcia')
    if (isRefillingSomePaintTank) errorsNew.push('Nie można wystartować. Trwa uzupełnianie zbiornika z farbą')
    if (isRefillingCleaningSubstanceTank) errorsNew.push('Nie można wystartować. Trwa uzupełnianie substancji czyszczącej')
    if (isManualWork) errorsNew.push('Nie można wystartować. Wybrano tryb pracy ręcznej')
    if (!isPaintSelected) errorsNew.push('Nie wybrano produktu. Przejdź do ekranu drugiego, aby wybrać.')

    setErrors(errorsNew)
    checkForErrors()

    if (errorsNew.length === 0) {
      // @ts-ignore
      tooltipRef.current?.hideTip()
      // @ts-ignore
      refillTooltipRef.current?.hideTip()

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

  useEffect(() => {
    if (prevProcessRunning === true && processRunning === false) {
      dispatch(setProcessRunning(false, socket))

    }
  }, [prevProcessRunning, processRunning])

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
          onClick={errors.length === 0 ? () => onSetProcessRunning(true) : undefined}
        >
          Uruchom proces
        </StartButton>
      </Tooltip>
      <StopButton
        disabled={!processRunning}
        isRunning={!processRunning}
        onClick={ processRunning ? () => onSetProcessRunning(false) : undefined}
      >Zatrzymaj proces</StopButton>
      <Tooltip
        ref={refillTooltipRef}
        content={checkIfSomeTankRefilling() ? 'Nie możesz użyć podczas uzupełniania zbiornika' : null}
        useDefaultStyles
        useHover={checkIfSomeTankRefilling()}
      >
        <RefillAllButton
          disabled={processRunning || checkIfSomeTankRefilling()}
          isRunning={processRunning}
          isRefill={checkIfSomeTankRefilling()}
          onClick={!checkIfSomeTankRefilling() ? onSetAllRefilling : undefined}
        >
          Uzupełnij wszystkie
        </RefillAllButton>  
        </Tooltip>

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

export type RefillProps = {
  isRefill: boolean
}

const RefillAllButton = styled(BaseButton)<ProcessRunningProps & RefillProps>`
  background: ${colors.NAVY_BLUE};
  width: 100%;
  box-shadow: 1px 1px 8px ${colors.NAVY_BLUE};

  &:hover {
    background: ${colors.BLUE_LIGHTEN};
  }

  ${({ isRunning, isRefill }) => (isRunning || isRefill) && css`
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