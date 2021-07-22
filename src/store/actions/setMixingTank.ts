import { IMixingTank } from "../../model/state";
import { ISetMixingTank, SET_MIXING_TANK } from "./actionType";

export const setMixingTank = (payload: IMixingTank): ISetMixingTank => ({
  type: SET_MIXING_TANK,
  payload
})