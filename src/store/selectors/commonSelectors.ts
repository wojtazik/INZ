import { Id, TankCurrentLevelData } from "../../model/commonTypes";
import { ICleaningSubstance, IMixingTank, IPaint, IState } from "../../model/state";
import colors from "../../styles/colors";
import { selectCleaningSubstance } from "./cleaningSubstanceSelectors";
import { selectMixingTank } from "./mixingTankSelectors";
import { find } from 'lodash'
import { selectChoosenColorCode } from "./choosenColorCodeSelectors";
import { colorNames } from "../../config/colors";

const selectTankById = (state: IState, { id }: { id: string }) => {
  const paints = state.paints
  const mixingTank = selectMixingTank(state)
  const cleaningSubstance = selectCleaningSubstance(state)

  const tankById = find([...paints, mixingTank, cleaningSubstance], (item: IMixingTank|ICleaningSubstance|IPaint) => {
    return item.id === id
  })

  return tankById
}

const selectTankCurrentVolumeData = (state: IState, 
  { id, isCleaningSubstance } : { id: Id, isCleaningSubstance?: boolean }) : TankCurrentLevelData => {
    const paints = state.paints
    const mixingTank = selectMixingTank(state)
    const cleaningSubstance = selectCleaningSubstance(state)

    const tankById = find([...paints, mixingTank, cleaningSubstance], (item: IMixingTank|ICleaningSubstance|IPaint) => {
      return item.id === id
    })

    return {
      name: !tankById?.hasOwnProperty('name') ? null : (tankById as IPaint).name,
      capacity: tankById?.capacity,
      current_level: tankById?.current_volume,
      color: isCleaningSubstance 
        ? colors.NAVY_BLUE.slice(1,) 
        : tankById?.id === mixingTank.id 
          ? selectChoosenColorCode(state)
          : (tankById as IPaint)?.code,
      // @ts-ignore
      current_volume_percent: (tankById?.current_volume_liters / tankById?.capacity) * 100
    }
}

const selectIsRefilling = (state: IState, { id }: { id: string }) => {
  const paints = state.paints
  const cleaningTank = state.cleaning_substance

  const tankById = find([...paints, cleaningTank], (item: ICleaningSubstance | IPaint) => {
    return item.id === id
  })

  return tankById?.refill
}

const selectIsValveOpen = (state: IState, { id }: {id: string}) => {
  const paints = state.paints
  const mixingTank = selectMixingTank(state)
  const cleaningSubstance = selectCleaningSubstance(state)

  const tankById = find([...paints, mixingTank, cleaningSubstance], (item: IMixingTank|ICleaningSubstance|IPaint) => {
    return item.id === id
  })

  return tankById?.valve_open || false
}

const selectMixerWorking = (state: IState): boolean => {
  return state.mixer_working
}

const selectIsPaintTank = (state: IState, { id } : { id: string }): boolean => {
  const tank = selectTankById(state, { id })

  if (tank === undefined || !tank.hasOwnProperty('name')) {
    return false
  }

  return colorNames.includes((tank as IPaint).name)
}
export {
  selectTankCurrentVolumeData,
  selectMixerWorking,
  selectIsValveOpen,
  selectIsRefilling,
  selectTankById,
  selectIsPaintTank
}