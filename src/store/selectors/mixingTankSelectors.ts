import { IState } from "../../model/state";

const selectMixingTank = (state: IState) => state.mixing_tank

export {
  selectMixingTank
}