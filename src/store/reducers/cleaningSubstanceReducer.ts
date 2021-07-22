import { ICleaningSubstance } from "../../model/state";
import { ISetCleaningSubstance, SET_CLEANING_SUBSTANCE } from "../actions/actionType";
import { v4 as uuidv4 } from 'uuid';

const initialCleaningSubstance = {
  id: uuidv4(),
  capacity: 20,
  current_volume: 10,
  valve_open: false,
  max_level: false,
  min_level: true
}

export const cleaningSubstanceReducer = (state: ICleaningSubstance = initialCleaningSubstance, action: ISetCleaningSubstance) => {
  switch (action.type) {
    case SET_CLEANING_SUBSTANCE:
      return action.payload
    default:
      return state
  }
}