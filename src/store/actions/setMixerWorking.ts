import { Action, Dispatch } from "redux";
import { IState } from "../../model/state";
import { ISetMixerWorking, SET_MIXER_WORKING } from "./actionType";

export const setMixerWorking = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetMixerWorking>): void => {

  socket.emit('change.mixer_working', payload, (resp) => {
    console.log('data emitteddddddd', resp)
    console.log(resp)
    if (resp.success) {
      console.log('stara kurwa')
      dispatch({
        type: SET_MIXER_WORKING,
        payload,
      })
    }
  })

}