import { Socket } from "dgram";
import { Dispatch } from "redux";
import { IPaint } from "../../model/state";
import { ISetPaint, ISetPaintRefilling, ISetPaints, ISetPaintsRefilling, ISetPaintValveState, SET_PAINT, SET_PAINTS, SET_PAINT_REFILLING, SET_PAINT_VALVE_STATE } from "./actionType";

export const setPaints = (payload: IPaint[], socket: any) => (dispatch: Dispatch<ISetPaints>) => {
  socket.emit('change.paints', payload)

  dispatch(pushPaints(payload.map((paint: IPaint) => {
    return {
      id: paint.id,
      ratio: paint.ratio,
      count: paint.count,
      count_liters: paint.count_liters
    }
  })))
}

export const pushPaints = (payload: Partial<IPaint>[]) => ({
  type: SET_PAINTS,
  payload
})

export const setPaint = (payload: Partial<IPaint>): ISetPaint => ({
  type: SET_PAINT,
  payload
})

export type ValveStatePayload = {
  id: string,
  name: string,
  valve_open: boolean
}

export const setPaintValveState = (payload: ValveStatePayload, socket: any) => (dispatch: Dispatch<ISetPaintValveState>) => {
  socket.emit('change.paint.valve_open', payload)
}

export const pushPaintValveState = (payload: Partial<IPaint>): ISetPaintValveState => ({
  type: SET_PAINT_VALVE_STATE,
  payload
})

export const pushPaint = (payload: Partial<IPaint>): ISetPaint => ({
  type: SET_PAINT,
  payload
})

export type RefillingPayload = {
  id: string,
  name: string,
  refilling: boolean
}

const pushPaintRefilling = (payload: RefillingPayload): ISetPaintRefilling => ({
  type: SET_PAINT_REFILLING,
  payload
})

export const setPaintRefilling = (payload: RefillingPayload, socket: any) => (dispatch: Dispatch<ISetPaintRefilling>) => {
  socket.emit('change.paint.refilling', payload)
}

export const setPaintsRefilling = ( socket: any) => (dispatch: Dispatch<ISetPaintsRefilling>) => {
  socket.emit('change.paints.refilling')
}