import { ICleaningSubstance } from "../../model/state";
import { ISetCleaningSubstance, SET_CLEANING_SUBSTANCE } from "./actionType";

export const setCleaningSubstance = (payload: ICleaningSubstance): ISetCleaningSubstance => ({
  type: SET_CLEANING_SUBSTANCE,
  payload
})