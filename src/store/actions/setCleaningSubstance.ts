import { Dispatch } from "redux";
import { ICleaningSubstance } from "../../model/state";
import { ISetCleaningSubstance, ISetCleaningSubstanceRefill, ISetCleaningSubstanceValveOpen, ISetPartialCleaningSubstance, SET_CLEANING_SUBSTANCE, SET_CLEANING_SUBSTANCE_REFILL, SET_CLEANING_SUBSTANCE_VALVE_OPEN, SET_PARTIAL_CLEANING_SUBSTANCE } from "./actionType";

export const setCleaningSubstance = (payload: ICleaningSubstance): ISetCleaningSubstance => ({
  type: SET_CLEANING_SUBSTANCE,
  payload
})

export const pushCleaningSubstanceValveOpen = (payload: boolean): ISetCleaningSubstanceValveOpen => ({
  type: SET_CLEANING_SUBSTANCE_VALVE_OPEN,
  payload
})

export const setCleaningSubstanceValveOpen = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetCleaningSubstanceRefill>) => {
  socket.emit('change.cleaning_substance.valve_open', payload)
}

export const pushCleaningSubstanceRefill = (payload: boolean): ISetCleaningSubstanceRefill => ({
  type: SET_CLEANING_SUBSTANCE_REFILL,
  payload
})

export const pushPartialCleaningSubstance = (payload: Partial<ICleaningSubstance>): ISetPartialCleaningSubstance => ({
  type: SET_PARTIAL_CLEANING_SUBSTANCE,
  payload
})

export const setCleaningSubstanceRefilling = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetCleaningSubstanceRefill>) => {
  socket.emit('change.cleaning_substance.refilling', payload)
}