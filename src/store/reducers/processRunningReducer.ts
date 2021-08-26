import { IProcessRunning } from "../../model/state"
import { ISetProcessRunning, ISetProcessRunningInfo, SET_PROCESS_RUNNING, SET_PROCESS_RUNNING_INFO, SET_PROCESS_RUNNING_SETTABLE } from "../actions/actionType"

const initialProcessRunningState: IProcessRunning = {
  info: false,
  settable: false
}

type ProcessRunningAction = ISetProcessRunning | ISetProcessRunningInfo | ISetProcessRunningInfo

export const processRunningReducer = (state: IProcessRunning = initialProcessRunningState, action: ProcessRunningAction) => {
  switch (action.type) {
    case SET_PROCESS_RUNNING: 
      return action.payload
    case SET_PROCESS_RUNNING_INFO:
      return {
        ...state,
        info: action.payload
      }
    case SET_PROCESS_RUNNING_SETTABLE:
      return {
        ...state,
        settable: action.payload
      }
    default:
      return state
  }
}