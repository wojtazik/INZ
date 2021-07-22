import { ISetMixerWorking, SET_MIXER_WORKING } from "../actions/actionType"

export const mixerWorkingReducer = (state: boolean = false, action: ISetMixerWorking) => {
  switch (action.type) {
    case SET_MIXER_WORKING: 
      return action.payload
    default:
      return state
  }
}