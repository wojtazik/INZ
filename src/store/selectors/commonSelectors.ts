import { Id, TankCurrentLevelData } from "../../model/commonTypes";
import { ICleaningSubstance, IMixingTank, IPaint, IState } from "../../model/state";
import colors from "../../styles/colors";
import { selectCleaningSubstance } from "./cleaningSubstanceSelectors";
import { selectMixingTank } from "./mixingTankSelectors";
import { find } from 'lodash'
import { selectChoosenColorCode } from "./choosenColorCodeSelectors";

const selectTankCurrentVolumeData = (state: IState, 
  { id, isCleaningSubstance } : { id: Id, isCleaningSubstance?: boolean }) : TankCurrentLevelData => {
    const paints = state.paints
    const mixingTank = selectMixingTank(state)
    const cleaningSubstance = selectCleaningSubstance(state)

    const tankById = find([...paints, mixingTank, cleaningSubstance], (item: IMixingTank|ICleaningSubstance|IPaint) => {
      return item.id === id
    })

    return {
      capacity: tankById?.capacity,
      current_level: tankById?.current_volume,
      color: isCleaningSubstance 
        ? colors.NAVY_BLUE.slice(1,) 
        : tankById?.id === mixingTank.id 
          ? selectChoosenColorCode(state)
          : (tankById as IPaint)?.code,
      // @ts-ignore
      current_volume_percent: tankById?.current_volume / tankById?.capacity
    }
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

export {
  selectTankCurrentVolumeData,
  selectMixerWorking,
  selectIsValveOpen
}