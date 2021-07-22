import { IError } from "../../model/state";
import { ISetErrors, SET_ERRORS } from "../actions/actionType";

export const errorsReducer = (state: IError[] = [], action: ISetErrors) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload
    default:
      return state
  }
}