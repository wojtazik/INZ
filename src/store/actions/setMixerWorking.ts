import { Action, Dispatch } from "redux";
import { IState } from "../../model/state";
import { ISetMixerWorking, SET_MIXER_WORKING } from "./actionType";

export const setMixerWorking = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetMixerWorking>): void => {
  // @ts-ignore
  socket.emit('change.mixer_working', payload)
}

export const pushMixerWorking = (payload: boolean) => ({
  type: SET_MIXER_WORKING,
  payload
})