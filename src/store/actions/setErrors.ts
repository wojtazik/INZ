import { IError } from "../../model/state";
import { SET_ERROR, SET_ERRORS, SET_MERGENCY_STOP } from "./actionType";

export const setErrors = (payload: IError[]) => ({
  type: SET_ERRORS,
  payload
})

export const setError = (payload: IError) => ({
  type: SET_ERROR,
  payload
})

export const setEmergencyStop = (payload: boolean) => ({
  type: SET_MERGENCY_STOP,
  payload
})