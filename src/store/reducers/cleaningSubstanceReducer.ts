import { ICleaningSubstance } from "../../model/state";
import { ISetCleaningSubstance, ISetCleaningSubstanceRefill, ISetCleaningSubstanceTime, ISetCleaningSubstanceValveOpen, ISetPartialCleaningSubstance, SET_CLEANING_SUBSTANCE, SET_CLEANING_SUBSTANCE_REFILL, SET_CLEANING_SUBSTANCE_TIME, SET_CLEANING_SUBSTANCE_TIME_REMAIN, SET_CLEANING_SUBSTANCE_VALVE_OPEN, SET_PARTIAL_CLEANING_SUBSTANCE } from "../actions/actionType";
import { v4 as uuidv4 } from 'uuid';

const initialCleaningSubstance: ICleaningSubstance = {
  id: uuidv4(),
  capacity: 500,
  current_volume: 0,
  current_volume_liters: 0,
  valve_open: false,
  max_level: false,
  min_level: true,
  refill: false,
  cleaning_time: 0,
  cleaning_time_remaining: 0
}

type CleaningSubstanceActions = 
  ISetCleaningSubstance
  | ISetCleaningSubstanceValveOpen 
  | ISetCleaningSubstanceRefill
  | ISetCleaningSubstanceTime

export const cleaningSubstanceReducer = (state: ICleaningSubstance = initialCleaningSubstance, action: CleaningSubstanceActions): ICleaningSubstance => {
  switch (action.type) {
    case SET_CLEANING_SUBSTANCE:
      return (action as ISetCleaningSubstance).payload
    case SET_PARTIAL_CLEANING_SUBSTANCE:
      return {
        ...state,
        ...(action as ISetPartialCleaningSubstance).payload
      }
    case SET_CLEANING_SUBSTANCE_VALVE_OPEN:
      return ({
        ...state,
        valve_open: (action as ISetCleaningSubstanceValveOpen).payload
      })
    case SET_CLEANING_SUBSTANCE_REFILL:
      return ({
        ...state,
        refill: (action as ISetCleaningSubstanceRefill).payload
      })
    case SET_CLEANING_SUBSTANCE_TIME:
      return ({
        ...state,
        cleaning_time: (action as ISetCleaningSubstanceTime).payload
      })
    case SET_CLEANING_SUBSTANCE_TIME_REMAIN:
      return ({
        ...state,
        cleaning_time_remaining: (action as ISetCleaningSubstanceTime).payload
      })
    default:
      return state
  }
}