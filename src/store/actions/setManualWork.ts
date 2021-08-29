import { Dispatch } from "redux"
import { ISetManualWork, SET_MANUAL_WORK } from "./actionType"

export const setManualWork = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetManualWork>): void => {
    socket.emit('change.manual_work', payload)
  }
  
  export const pushManualWork = (payload: boolean) => ({
    type: SET_MANUAL_WORK,
    payload
  })