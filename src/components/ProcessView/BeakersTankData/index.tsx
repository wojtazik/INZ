import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { setBeakers, setBeakersLevel } from '../../../store/actions/setBeakers'
import { selectBakersData } from '../../../store/selectors/beakersSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'
import DefaultIcon from '../../common/DefaultIcon/DefaultIcon'


const BeakersTankData = () => {
  const beakersData = useSelector(selectBakersData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBeakersLevel(500))
  }, [])

  const onToggleValve = () => {
    dispatch(setBeakers({ valve_open: !beakersData.valve_open }))
  }

  console.log(beakersData)

  return (
    <BeakersTankDataWrapper>
      <BeakersTank>
        <BeakersTankLabel>Zuż. czyściwo</BeakersTankLabel>
        <MinLevelLamp active={beakersData.current_volume === 0}/>
        <MaxLevelLamp active={beakersData.current_volume === beakersData.capacity}/>
        <ValveIcon
          className='ico-valve'
          isOpen={beakersData.valve_open}
          onClick={onToggleValve}
        /> 
        <BeakersTankLevelWrapper>
          <BeakersTankCurrentLevel levelPercent={beakersData.current_level_percent * 100}/>
        </BeakersTankLevelWrapper>
      </BeakersTank>
    </BeakersTankDataWrapper>
  )
}

const BeakersTankDataWrapper = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BeakersTank = styled.div`
  width: 125px;
  height: 200px;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  background: linear-gradient(90deg, rgba(192,192,192,1) 0%, rgba(128,128,128,1) 68%);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  &:before {
    background: linear-gradient(90deg, rgba(192,192,192,1) 0%, rgba(128,128,128,1) 68%);
    content: '';
    position: absolute;
    bottom: -30px;
    height: 30px;
    width: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const BeakersTankLabel = styled.div`
  background: rgba(117,246,113,0.42);
  height: 25px;
  padding: 3px;
  border-radius: 3px;
  position: absolute;
  top: 5px;
  left: 50%;
  white-space: nowrap;
  color: ${colors.BLACK};
  text-transform: uppercase;
  transform: translateX(-50%);
  width: 90%;
  font-size: ${fonts.FONT_SMALL_SIZE};
  display: flex;
  justify-content: center;
  align-items: center;
`

const TankStateLamp = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  left: 20px;
`

type IMinMaxLevelLampProp = {
  active: boolean
}

const MinLevelLamp = styled(TankStateLamp)<IMinMaxLevelLampProp>`
  bottom: 5%;
  background: ${colors.GREEN_BASIC};

  ${({ active }) => active && css`
    background: ${colors.GREEN_LIGHT};
  `}
`

const MaxLevelLamp = styled(TankStateLamp)<IMinMaxLevelLampProp>`
  top: 18%;
  background: ${colors.RED_BASIC};

  ${({ active }) => active && css`
    background: ${colors.ERROR_RED};
  `}
`

const BeakersTankLevelWrapper = styled.div`
  height: 80%;
  margin-bottom: 5%;
  width: 15px;
  border-radius: 15px;
  margin-right: 20px;
  background: rgba(0,0,0,.7);
  position: relative;
  overflow: hidden;
`

type IBeakersTankCurrentLevelProps = {
  levelPercent: number
}

const BeakersTankCurrentLevel = styled.div<IBeakersTankCurrentLevelProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ levelPercent }) => levelPercent + '%'};
  background: ${colors.NAVY_BLUE};
`

type IValveIconProps = {
  isOpen: boolean
}

const ValveIcon = styled(DefaultIcon)<IValveIconProps>`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  ${({ isOpen }) => isOpen && css`
    color: ${colors.GREEN_BASIC}
  `}
`

export default BeakersTankData