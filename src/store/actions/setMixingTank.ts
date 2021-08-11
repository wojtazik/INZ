import { IMixingTank } from "../../model/state";
import { ISetMixingTank, ISetPartialMixingTank, SET_MIXING_TANK, SET_PARTIAL_MIXING_TANK } from "./actionType";

export const setMixingTank = (payload: Partial<IMixingTank>): ISetMixingTank => ({
  type: SET_MIXING_TANK,
  payload
})

export const pushPartialMixingTank = (payload: Partial<IMixingTank>): ISetPartialMixingTank => ({
  type: SET_PARTIAL_MIXING_TANK,
  payload
})