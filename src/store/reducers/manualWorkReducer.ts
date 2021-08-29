import { ISetManualWork, SET_MANUAL_WORK } from "../actions/actionType"

export const manualWorkReducer = (state: boolean = false, action: ISetManualWork) => {
  switch (action.type) {
    case SET_MANUAL_WORK: 
      return action.payload
    default:
      return state
  }
}