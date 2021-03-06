import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { setMixerWorking } from '../../../store/actions/setMixerWorking'
import { selectCleaningSubstance } from '../../../store/selectors/cleaningSubstanceSelectors'
import { selectMixerWorking } from '../../../store/selectors/commonSelectors'
import { selectMixingTank } from '../../../store/selectors/mixingTankSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import { ReactComponent as MixerIcon } from './assets/motor.svg'

const MixingTankProcessView = () => {
  const mixingTank = useSelector(selectMixingTank)
  const mixerWorking = useSelector(selectMixerWorking)
  const cleaningTank = useSelector(selectCleaningSubstance)
  const ws = useIO()
  const dispatch = useDispatch()

  const toggleMixerWorking = () => {
    dispatch(setMixerWorking(!mixerWorking, ws))
  }

  return (
    <TankDataWrapper>
      <TankDataRow>
        <TankDataKey bigTitle>
          Zbiornik mieszalnika
        </TankDataKey>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Obj. do osiągnięcia:
        </TankDataKey>
        <TankDataValue>
          {mixingTank.volume_to_gain.toFixed(2)} L
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Obecnie [L]:
        </TankDataKey>
        <TankDataValue>
          {mixingTank.current_volume_liters.toFixed(2)} L
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Ustawiony czas:
        </TankDataKey>
        <TankDataValue>
          {mixingTank.mixing_time_seconds} s
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Pozostały czas:
        </TankDataKey>
        <TankDataValue>
          {mixingTank.mixing_time_seconds_remaining} s
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Ustawiony czas czyszczenia:
        </TankDataKey>
        <TankDataValue>
          {cleaningTank.cleaning_time} s
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Pozostały czas czyszczenia:
        </TankDataKey>
        <TankDataValue>
          {cleaningTank.cleaning_time_remaining} s
        </TankDataValue>
      </TankDataRow>

      <TankDataRow>
        <TankDataKey>
          Zawór:
        </TankDataKey>
        <TankDataValue>
          {mixingTank.valve_open_read ? 'Otwarty' : 'Zamknięty'}
        </TankDataValue>
      </TankDataRow>

      <MixerIconWrapper>
        <MixerIconStyled mixerWorking={mixerWorking} onClick={toggleMixerWorking}/>
      </MixerIconWrapper>
    </TankDataWrapper>
  )
}

const TankDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const TankDataRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`

const TankDataKey = styled.span<{bigTitle?: boolean}>`
  font-weight: 700;
  font-size: ${fonts.FONT_SMALL_SIZE};
  min-width: 100%;
  ${({ bigTitle }) => bigTitle && css`
    font-size: ${fonts.FONT_MEDIUM_SIZE};
    padding-bottom: 10px;
  `}
`

const TankDataValue = styled.span`
  font-weight: 300;
  font-size: ${fonts.FONT_SMALL_SIZE};
  display: flex;
  align-items: center;
  white-space: nowrap;
`

const MixerIconWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`

const MixerIconStyled = styled(MixerIcon)<{mixerWorking: boolean}>`
  width: 40px;
  height: 40px;

  ${({ mixerWorking }) => mixerWorking && css`
    animation: ${rotate} .5s linear infinite, ${moveOutline} 1.5s linear infinite;
    transform-origin: 22px 18px;
    fill: ${colors.GREEN_BASIC};
  `}
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const moveOutline = keyframes`
  from {
    outline: 2px;
    outline-offset: 3px;
    outline-color: rgba(18, 136, 25, 1);
  }

  to {
    outline: 5px;
    outline-offset: 10px;
    outline-color: rgba(18, 136, 25, 0);
  }
`

export default MixingTankProcessView