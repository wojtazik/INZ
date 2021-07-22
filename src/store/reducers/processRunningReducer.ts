import { ISetProcessRunning, SET_PROCESS_RUNNING } from "../actions/actionType"

export const processRunningReducer = (state: boolean = false, action: ISetProcessRunning) => {
  switch (action.type) {
    case SET_PROCESS_RUNNING: 
      return action.payload
    default:
      return state
  }
}