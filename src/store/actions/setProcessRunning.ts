import { Dispatch } from "redux";
import { ISetProcessRunning, SET_PROCESS_RUNNING, SET_PROCESS_RUNNING_INFO, SET_PROCESS_RUNNING_SETTABLE } from "./actionType";

export const setProcessRunning = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetProcessRunning>): void => {
  socket.emit('change.process_running', payload)
}

export const pushProcessRunning = (payload: boolean) => ({
  type: SET_PROCESS_RUNNING,
  payload
})

export const pushProcessRunningSettable = (payload: boolean) => ({
  type: SET_PROCESS_RUNNING_SETTABLE,
  payload
})

export const pushProcessRunningInfo = (payload: boolean) => ({
  type: SET_PROCESS_RUNNING_INFO,
  payload
})