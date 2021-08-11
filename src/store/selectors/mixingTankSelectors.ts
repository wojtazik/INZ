import { IState } from "../../model/state";

const selectMixingTank = (state: IState) => state.mixing_tank

const selectVolumeToGain = (state: IState) => state.mixing_tank.volume_to_gain

export {
  selectMixingTank,
  selectVolumeToGain
}