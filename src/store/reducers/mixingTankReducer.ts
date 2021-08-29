import { IMixingTank } from "../../model/state";
import { ISetMixingTank, ISetPartialMixingTank, SET_MIXING_TANK, SET_PARTIAL_MIXING_TANK } from "../actions/actionType";
import { v4 as uuidv4 } from 'uuid';
import { reduce } from "lodash";

const initialMixingTank: IMixingTank = {
  id: uuidv4(),
  current_volume: 0,
  current_volume_liters: 0,
  capacity: 5000,
  mixing_time_seconds: 0,
  mixing_time_seconds_remaining: 0,
  valve_open: false,
  volume_to_gain: 0
}

export const mixingTankReducer = (state: IMixingTank = initialMixingTank, action: ISetMixingTank | ISetPartialMixingTank) => {
  switch (action.type) {
    case SET_MIXING_TANK:
      return {
        ...state,
        ...action.payload
      }
    case SET_PARTIAL_MIXING_TANK:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}