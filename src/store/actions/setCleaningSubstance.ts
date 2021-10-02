import { Dispatch } from "redux";
import { ICleaningSubstance } from "../../model/state";
import { ISetCleaningSubstance, ISetCleaningSubstanceRefill, ISetCleaningSubstanceTime, ISetCleaningSubstanceValveOpen, ISetPartialCleaningSubstance, SET_CLEANING_SUBSTANCE, SET_CLEANING_SUBSTANCE_REFILL, SET_CLEANING_SUBSTANCE_TIME, SET_CLEANING_SUBSTANCE_TIME_REMAIN, SET_CLEANING_SUBSTANCE_VALVE_OPEN, SET_PARTIAL_CLEANING_SUBSTANCE } from "./actionType";

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

export const pushCleaningSubstanceTimeRemain = (payload: number): ISetCleaningSubstanceTime => ({
  type: SET_CLEANING_SUBSTANCE_TIME_REMAIN,
  payload
})

export const pushCleaningSubstanceTime = (payload: number): ISetCleaningSubstanceTime => ({
  type: SET_CLEANING_SUBSTANCE_TIME,
  payload
})

export const setCleaningSubstanceTime = (payload: number, socket: any) => (dispatch: Dispatch<ISetCleaningSubstanceTime>) => {
  setTimeout(() => {
    socket.emit('change.cleaning_substance.cleaning_time', payload)
  }, 100)

  dispatch(pushCleaningSubstanceTime(payload))
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