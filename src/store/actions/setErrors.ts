import { IError } from "../../model/state";
import { SET_ERRORS } from "./actionType";

export const setErrors = (payload: IError[]) => ({
  type: SET_ERRORS,
  payload
})