import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectMixingTank } from '../../../store/selectors/mixingTankSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import MixingTankProcessView from '../MixingTankProcessView'
import TankLevelBar from '../TankLevelBar'
import Tooltip from 'react-tooltip-lite'
import { IInputError } from '../../../model/commonTypes'
import validate from './validate'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'
import Button, { TooltippedButton } from '../../common/SimpleButton/SimpleButton'
import { setMixingTank, setMixingTankValveState } from '../../../store/actions/setMixingTank'
import { selectPaints } from '../../../store/selectors/paintsSelectors'
import { IPaint } from '../../../model/state'
import { setPaints } from '../../../store/actions/setPaints'
import { useIO } from '../../../context/SocketContext'
import { selectIsMixerWorking } from '../../../store/selectors/mixerWorkingSelectors'

const MixingTankData = () => {
  const isProcessRunning = useSelector(selectIsProcessRunning)
  const isMixerWorking = useSelector(selectIsMixerWorking)
  const mixingTank = useSelector(selectMixingTank)
  const paints = useSelector(selectPaints)

  const [isEditMode, onSetIsEditMode] = useState(false)
  const [localVolumeToGain, onSetLocalVolumeToGain] = useState(mixingTank.volume_to_gain)
  const [errors, setErrors] = useState<IInputError[]>([])
  const [localMixingTime, onSetLocalMixingTime] = useState(mixingTank.mixing_time_seconds)
  
  const tooltipRef = useRef<Tooltip>(null)
  
  const socket = useIO()

  const dispatch = useDispatch()

  const toggleIsEditMode = () => {
    onSetIsEditMode(!isEditMode)
  }

  const toggleValveOpen = () => {
    dispatch(setMixingTankValveState(!mixingTank.valve_open, socket))
  }

  useEffect(() => {
    const currentErrors = validate({
      localVolumeToGain,
      localMixingTime,
      mixingTank
    })
    
    setErrors(currentErrors)

    if (currentErrors.length === 0) {
      // @ts-ignore
      tooltipRef.current?.hideTip()
    }
  }, [localMixingTime, localVolumeToGain, mixingTank])


  const renderTooltipErrors = useCallback(() => (
    <TooltipContent>
      {errors.map((error: IInputError) => (
        <li>[{error.field}] {error.message}</li>
      ))}
    </TooltipContent>
  ), [errors])

  const saveProcessParams = () => {
    dispatch(setMixingTank({
      mixing_time_seconds: localMixingTime,
      volume_to_gain: localVolumeToGain
    }, socket))
    const newPaints = paints.map((paint: IPaint) => ({
      ...paint,
      count_liters: paint.ratio * localVolumeToGain
    }))

    dispatch(setPaints(newPaints, socket))

    toggleIsEditMode()
  }

  const renderEditMode = () => (
    <MixingTankWrapper>
      <TankLevelBar id={mixingTank.id} isMixingTank={true} />
      <TooltippedButton>
        <Tooltip
          ref={tooltipRef}
          content={errors.length > 0 && renderTooltipErrors()}
          useDefaultStyles
          useHover={errors.length > 0}
        >
          <Button onClick={saveProcessParams} disabled={errors.length > 0}>Zapisz</Button>
        </Tooltip>
      </TooltippedButton>
      <FormInputsWrapper>
        <Label htmlFor='mixing_tank_data_volume_to_gain'>Obj. do osiągnięcia</Label>
        <Row>
          <Input
            type='number'
            name='mixing_tank_data_volume_to_gain'
            value={localVolumeToGain}
            onChange={(e) => onSetLocalVolumeToGain(parseInt(e.target.value))}
          />
          <span>L</span>
        </Row>
        <Label htmlFor='mixing_tank_data_mixing_time'>Czas mieszania</Label>
        <Row>
          <Input
            type='number'
            name='mixing_tank_data_mixing_time'
            value={localMixingTime}
            onChange={(e) => onSetLocalMixingTime(parseInt(e.target.value))}
          />
          <span>S</span>
        </Row>
      </FormInputsWrapper>
    </MixingTankWrapper>
  )

  const renderProcessInfo = () => (
    <MixingTankWrapper>
      <TankLevelBar id={mixingTank.id}  isMixingTank={true} />
      <MixingTankProcessView />
      <TooltippedButton position='first'>
        <Tooltip
          content={
            <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>
          }
          useHover={isProcessRunning || isMixerWorking}
          useDefaultStyles
        >
          <div>
            <Button
              onClick={!isProcessRunning && !isMixerWorking ? toggleValveOpen : () => {}}
              isDisabled={isProcessRunning}
              id='toggle-mixing-tank-edit'
            >
              {mixingTank.valve_open ? 'Zamknij zawór' : 'Otwórz zawór'}
            </Button>
          </div>

        </Tooltip>
      </TooltippedButton>
      <TooltippedButton>
        <Tooltip
          content={
            <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>
          }
          useHover={isProcessRunning || isMixerWorking}
          useDefaultStyles
        >
          <div>
            <Button
              onClick={!isProcessRunning && isMixerWorking ? toggleIsEditMode : () => {}}
              isDisabled={isProcessRunning}
              id='toggle-mixing-tank-edit'
            >
              Edytuj proces
            </Button>
          </div>

        </Tooltip>
      </TooltippedButton>
    </MixingTankWrapper>
  )

  return isEditMode && !isProcessRunning ? (
    renderEditMode()
  ) : (
    renderProcessInfo()
  )
}

const MixingTankWrapper = styled.div`
  box-shadow: 1px 1px 6px 4px rgba(0,0,0,0.7);
  border-radius: 5px;
  padding: 10px;
  min-height: 300px;
  min-width: 310px;
  display: flex;
  position: relative;
`

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Input = styled.input`
  cursor: pointer;
  border: 1px solid ${colors.BLACK};
  background: transparent;
  outline: none;
  padding: 5px 8px;
  border-radius: 3px;
  color: ${colors.BLACK};
  align-self: baseline;
  margin-left: 10px;
  margin-right: 5px;
`

const Label = styled.label`
  margin-left: 10px;
  color: ${colors.BLACK};
  display: block;
  font-size: ${fonts.FONT_SMALL_SIZE};
  margin-bottom: 1px;
`

const FormInputsWrapper = styled.form``

export default MixingTankData