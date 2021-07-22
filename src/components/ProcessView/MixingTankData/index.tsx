import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectMixingTank } from '../../../store/selectors/mixingTankSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import MixingTankProcessView from '../MixingTankProcessView'
import TankLevelBar from '../TankLevelBar'
import Tooltip from 'react-tooltip-lite'

const MixingTankData = () => {
  const isProcessRunning = useSelector(selectIsProcessRunning)
  const mixingTank = useSelector(selectMixingTank)
  const [isEditMode, onSetIsEditMode] = useState(false)
  const [localVolumeToGain, onSetLocalVolumeToGain] = useState(mixingTank.volume_to_gain)

  const toggleIsEditMode = () => {
    onSetIsEditMode(!isEditMode)
  }

  const checkForm = () => {
    if (localVolumeToGain < 0 || localVolumeToGain > mixingTank.capacity) {
      return 'Objętość poza zakresem'
    }
    
    return false
  }

  return isEditMode && !isProcessRunning ? (
    <MixingTankWrapper>
      <TankLevelBar id={mixingTank.id} />
      <TooltippedButton>
        <Tooltip
          content={checkForm() && <TooltipContent>{checkForm()}</TooltipContent>}
          useDefaultStyles
          useHover={Boolean(checkForm())}
        >
          <EditButton onClick={toggleIsEditMode} disabled={!checkForm()}>Zapisz</EditButton>
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
  ) : (
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
          <EditButton
            onClick={toggleIsEditMode}
            disabled={isProcessRunning}
            id='toggle-mixing-tank-edit'
          >
            Edytuj proces
          </EditButton>
        </Tooltip>
      </TooltippedButton>
      
    </MixingTankWrapper>
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

const TooltippedButton = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`

const EditButton = styled.button`

  cursor: pointer;
  border: 1px solid ${colors.BLACK};
  background: transparent;
  outline: none;
  padding: 5px 8px;
  border-radius: 3px;
  transition: all .3s;

  &:hover,
  &:visited,
  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(0,0,0,.1);
  }
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

const TooltipContent = styled.span`
  font-size: ${fonts.FONT_SMALL_SIZE}
`

const FormInputsWrapper = styled.form``

export default MixingTankData