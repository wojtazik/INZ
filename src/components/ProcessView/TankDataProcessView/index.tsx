import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Id } from '../../../model/commonTypes'
import { IState } from '../../../model/state'
import { selectPaintDataById } from '../../../store/selectors/paintsSelectors'
import fonts from '../../../styles/fonts'
import { cellSize } from '../../../styles/spacings'

export type ITankDataProcessView = {
  id: Id
}

const TankDataProcessView = ({ id }: ITankDataProcessView) => {
  const paintTankData = useSelector((state: IState) => selectPaintDataById(state, { id }))

  return (
    <TankDataWrapper>

      <TankDataRow>
        <TankDataKey>Kod Koloru: </TankDataKey>
        <TankDataValue>
          #{paintTankData.code}
          <ColorHint colorCode={paintTankData.code} />
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Nazwa: </TankDataKey>
        <TankDataValue>
          {paintTankData.name}
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Ilość do os.[L]: </TankDataKey>
        <TankDataValue>
          {paintTankData.count_liters} L
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Obecnie[L]: </TankDataKey>
        <TankDataValue>
          {paintTankData.current_volume_liters} L
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Ilość[jedn.]: </TankDataKey>
        <TankDataValue>
          {paintTankData.count}
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Stosunek: </TankDataKey>
        <TankDataValue>
          {paintTankData.ratio}
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Zawór: </TankDataKey>
        <TankDataValue>
          {paintTankData.valve_open ? 'Otwarty' : 'Zamknięty'}
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Maks. poziom: </TankDataKey>
        <TankDataValue>
          {paintTankData.max_level ? 'Tak' : 'Nie'}
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>Min. poziom: </TankDataKey>
        <TankDataValue>
          {paintTankData.min_level ? 'Tak' : 'Nie'}
        </TankDataValue>
      </TankDataRow>

    </TankDataWrapper>
  )
}

const TankDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding-right: 10px;
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

const ColorHint = styled.span<{colorCode: string}>`
  width: 15px;
  height: 15px;
  display: inline-flex;
  border-radius: 50%;
  transition: transform .5s ease;
  margin-left: 10px;
  cursor: pointer;
  background: ${({ colorCode }) => `#${colorCode}`};

  &:hover {
    transform: scale(5);
  }
`

export default TankDataProcessView