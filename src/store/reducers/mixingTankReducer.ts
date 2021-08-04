import { IMixingTank } from "../../model/state";
import { ISetMixingTank, SET_MIXING_TANK } from "../actions/actionType";
import { v4 as uuidv4 } from 'uuid';

const initialMixingTank: IMixingTank = {
  id: uuidv4(),
  current_volume: 500,
  capacity: 1000,
  mixing_time_seconds: 0,
  mixing_time_seconds_remaining: 0,
  valve_open: false,
  volume_to_gain: 100
}

export const mixingTankReducer = (state: IMixingTank = initialMixingTank, action: ISetMixingTank) => {
  switch (action.type) {
    case SET_MIXING_TANK:
      return action.payload
    default:
      return state
  }
}