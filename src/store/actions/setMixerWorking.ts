import { ISetMixerWorking, SET_MIXER_WORKING } from "./actionType";

export const setMixerWorking = (payload: boolean): ISetMixerWorking => ({
  type: SET_MIXER_WORKING,
  payload
})