import { IPaint } from "../../model/state";
import { ISetPaint, ISetPaints, ISetPaintValveState, SET_PAINT, SET_PAINTS, SET_PAINT_VALVE_STATE } from "./actionType";

export const setPaints = (payload: IPaint[]): ISetPaints => ({
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