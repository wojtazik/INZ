import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
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

const MixingTankData = () => {
  const isProcessRunning = useSelector(selectIsProcessRunning)
  const mixingTank = useSelector(selectMixingTank)
  const [isEditMode, onSetIsEditMode] = useState(false)
  const [localVolumeToGain, onSetLocalVolumeToGain] = useState(mixingTank.volume_to_gain)
  const [errors, setErrors] = useState<IInputError[]>([])

  const tooltipRef = useRef<Tooltip>(null)

  const toggleIsEditMode = () => {
    onSetIsEditMode(!isEditMode)
  }

  useEffect(() => {
    const currentErrors = validate({
      localVolumeToGain,
      mixingTank
    })
    
    setErrors(currentErrors)

    if (currentErrors.length === 0) {
      // @ts-ignore
      tooltipRef.current?.hideTip()
    }
  }, [localVolumeToGain, mixingTank])


  const renderTooltipErrors = useCallback(() => (
    <TooltipContent>
      {errors.map((error: IInputError) => (
        <li>[{error.field}] {error.message}</li>
      ))}
    </TooltipContent>
  ), [errors])

  const renderEditMode = () => (
    <MixingTankWrapper>
      <TankLevelBar id={mixingTank.id} />
      <TooltippedButton>
        <Tooltip
          ref={tooltipRef}
          content={errors.length > 0 && renderTooltipErrors()}
          useDefaultStyles
          useHover={errors.length > 0}
        >
          <Button onClick={toggleIsEditMode} disabled={errors.length > 0}>Zapisz</Button>
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
      </FormInputsWrapper>
    </MixingTankWrapper>
  )

  const renderProcessInfo = () => (
    <MixingTankWrapper>
      <TankLevelBar id={mixingTank.id} />
      <MixingTankProcessView />
      <TooltippedButton>
        <Tooltip
          content={
            <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>
          }
          useHover={isProcessRunning}
          useDefaultStyles
        >
          <div>
            <Button
              onClick={!isProcessRunning ? toggleIsEditMode : () => {}}
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