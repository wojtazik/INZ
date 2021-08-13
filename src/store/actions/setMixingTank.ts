import { Dispatch } from "redux";
import { IMixingTank } from "../../model/state";
import { ISetMixingTank, ISetPartialMixingTank, SET_MIXING_TANK, SET_PARTIAL_MIXING_TANK } from "./actionType";

export const setMixingTank = (payload: Partial<IMixingTank>, socket: any) => (dispatch: Dispatch<ISetMixingTank>): void => {
  socket.emit('change.mixing_tank', payload)

  dispatch(pushPartialMixingTank(payload))
}

export const setMixingTankValveState = (payload: boolean, socket: any) => (dispatch: Dispatch<ISetMixingTank>) => {
  socket.emit('change.mixing_tank.valve_open', payload)
}


export const pushPartialMixingTank = (payload: Partial<IMixingTank>): ISetPartialMixingTank => ({
  type: SET_PARTIAL_MIXING_TANK,
  payload
})


