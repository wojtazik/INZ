import { Socket } from "dgram";
import { Dispatch } from "redux";
import { IPaint } from "../../model/state";
import { ISetPaint, ISetPaints, ISetPaintValveState, SET_PAINT, SET_PAINTS, SET_PAINT_VALVE_STATE } from "./actionType";

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

export const setPaint = (payload: IPaint): ISetPaint => ({
  type: SET_PAINT,
  payload
})

export const setPaintValveState = (payload: Partial<IPaint>): ISetPaintValveState => ({
  type: SET_PAINT_VALVE_STATE,
  payload
})

export const pushPaint = (payload: Partial<IPaint>): ISetPaint => ({
  type: SET_PAINT,
  payload
})