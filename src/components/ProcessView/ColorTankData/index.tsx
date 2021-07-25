import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tooltip from 'react-tooltip-lite'
import styled from 'styled-components'
import { Id } from '../../../model/commonTypes'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import Button, { TooltippedButton } from '../../common/SimpleButton/SimpleButton'
import { TooltipContent } from '../../common/TooltipContent/TooltipContent'
import ColorTankDataActionButtons from '../ColorTankDataActionButtons/ColorTankDataActionButtons'
import TankDataProcessView from '../TankDataProcessView'
import TankLevelBar from '../TankLevelBar'

export type IColorTankDataProps = {
  id: Id
}

const ColorTankData = ({ id }: IColorTankDataProps) => {

  const [ isEditMode, onSetIsEditMode ] = useState(false)

  const isProcessRunning = useSelector(selectIsProcessRunning)

  const toggleIsEditMode = () => {
    onSetIsEditMode(!isEditMode)
  }

  useEffect(() => {
    console.log(isEditMode)
  }, [isEditMode])

  return isEditMode && !isProcessRunning ? (
    <ColorTankDataWrapper>edit....</ColorTankDataWrapper>
  ) : (
    <ColorTankDataWrapper>
      <TankLevelBar id={id} />
      <TankDataProcessView id={id}/>
      <ColorTankDataActionButtons id={id}/>
      {/* We have decidet, that we don't need it for now */}
      {/* <TooltippedButton position='right'>
        <Tooltip
          content={
            <TooltipContent>Nie możesz edytować trwajacego procesu</TooltipContent>
          }
          useHover={isProcessRunning}
          useDefaultStyles
        >
          <Button
            onClick={!isProcessRunning ? toggleIsEditMode : () => {}}
            isDisabled={isProcessRunning}
            id='toggle-mixing-tank-edit'
          >
            Edytuj proces
          </Button>
        </Tooltip>
      </TooltippedButton> */}
    </ColorTankDataWrapper>  
  )
}

const ColorTankDataWrapper = styled.div`
  box-shadow: 1px 1px 4px 2px rgba(0,0,0,0.5);
  border-radius: 5px;
  padding: 10px;
  min-height: 200px;
  min-width: 310px;
  display: flex;
  position: relative;
`


export default ColorTankData