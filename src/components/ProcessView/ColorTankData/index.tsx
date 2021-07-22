import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Id } from '../../../model/commonTypes'
import { IPaint, IState } from '../../../model/state'
import { setMixerWorking } from '../../../store/actions/setMixerWorking'
import { selectPaintDataById } from '../../../store/selectors/paintsSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import ColorTankDataActionButtons from '../ColorTankDataActionButtons/ColorTankDataActionButtons'
import TankDataProcessView from '../TankDataProcessView'
import TankLevelBar from '../TankLevelBar'

export type IColorTankDataProps = {
  id: Id
}

const ColorTankData = ({ id }: IColorTankDataProps) => {

  const [ isEditMode, onSetIsEditMode ] = useState(false)

  const isProcessRunning = useSelector(selectIsProcessRunning)

  return isEditMode && !isProcessRunning ? (
    <ColorTankDataWrapper>edit....</ColorTankDataWrapper>
  ) : (
    <ColorTankDataWrapper>
      <TankLevelBar id={id} />
      <TankDataProcessView id={id}/>
      <ColorTankDataActionButtons id={id}/>
    </ColorTankDataWrapper>  
  )
}

const ColorTankDataWrapper = styled.div`
  box-shadow: 1px 1px 4px 2px rgba(0,0,0,0.5);
  border-radius: 5px;
  padding: 10px;
  min-height: 200px;
  min-width: 245px;
  display: flex;
`


export default ColorTankData