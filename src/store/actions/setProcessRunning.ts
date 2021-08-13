import { Dispatch } from "redux";
import { ISetProcessRunning, SET_PROCESS_RUNNING } from "./actionType";

export const setProcessRunning = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetProcessRunning>): void => {
  socket.emit('change.process_running', payload)
}

export const pushProcessRunning = (payload: boolean) => ({
  type: SET_PROCESS_RUNNING,
  payload
})