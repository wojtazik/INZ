import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { setCleaningSubstanceRefilling } from '../../../store/actions/setCleaningSubstance'
import { selectCleaningSubstance } from '../../../store/selectors/cleaningSubstanceSelectors'
import fonts from '../../../styles/fonts'

const CleaningSubstanceTankDataProcessView = () => {
  const cleaningSubstance = useSelector(selectCleaningSubstance)
  const socket = useIO()
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (cleaningSubstance.current_volume_liters >= 500 && cleaningSubstance.refill) {
      dispatch(setCleaningSubstanceRefilling(false, socket))
    }
  }, [cleaningSubstance])

  return (
    <TankDataWrapper>
      <TankDataRow>
        <TankDataKey>Nazwa:</TankDataKey>
        <TankDataValue>Czyściwo</TankDataValue>
      </TankDataRow>
      <TankDataRow>
        <TankDataKey>Obecnie [L]:</TankDataKey>
        <TankDataValue>
          {cleaningSubstance.current_volume_liters} L
        </TankDataValue>
      </TankDataRow>
      <TankDataRow>
        <TankDataKey>Zawór:</TankDataKey>
        <TankDataValue>
        {cleaningSubstance.valve_open ? 'Otwarty' : 'Zamknięty'}
        </TankDataValue>
      </TankDataRow>
      <TankDataRow>
        <TankDataKey>Maks. poziom:</TankDataKey>
        <TankDataValue>
        {cleaningSubstance.max_level ? 'Tak' : 'Nie'}
        </TankDataValue>
      </TankDataRow>
      <TankDataRow>
        <TankDataKey>Min. poziom:</TankDataKey>
        <TankDataValue>
        {cleaningSubstance.min_level ? 'Tak' : 'Nie'}
        </TankDataValue>
      </TankDataRow>
    </TankDataWrapper>
  )
}

const TankDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  min-width: 155px;
`

const TankDataRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`

const TankDataKey = styled.span`
  font-weight: 700;
  font-size: ${fonts.FONT_SMALL_SIZE};
  min-width: 65%;
`

const TankDataValue = styled.span`
  font-weight: 300;
  font-size: ${fonts.FONT_SMALL_SIZE};
  display: flex;
  align-items: center;
`

export default CleaningSubstanceTankDataProcessView