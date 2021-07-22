import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IState } from '../../../model/state'
import { selectCleaningSubstance } from '../../../store/selectors/cleaningSubstanceSelectors'
import { selectMixingTank } from '../../../store/selectors/mixingTankSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import CleaningSubstanceTankDataProcessView from '../CleaningSubstanceTankDataProcessView'
import TankLevelBar from '../TankLevelBar'

const MixingTankData = () => {

  const [ isEditMode, onSetIsEditMode ] = useState(false)

  const isProcessRunning = useSelector(selectIsProcessRunning)

  const cleaningSubstance = useSelector(selectCleaningSubstance)

  return isEditMode && !isProcessRunning ? (
    <MixingTankDataWrapper>
      edit...
    </MixingTankDataWrapper>
  ) : (
    <MixingTankDataWrapper>
      <TankLevelBar id={cleaningSubstance.id} isCleaningSubstance />
      <CleaningSubstanceTankDataProcessView />
    </MixingTankDataWrapper>  
  )
}

const MixingTankDataWrapper = styled.div`
  box-shadow: 1px 1px 4px 2px rgba(0,0,0,0.5);
  background: rgba(0, 50, 220, .05);
  border-radius: 5px;
  padding: 10px;
  min-height: 200px;
  display: flex;
`

export default MixingTankData