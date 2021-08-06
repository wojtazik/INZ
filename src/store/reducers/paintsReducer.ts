import colors, { ConfigColorInterface, PAINT_INITIAL_COUNT, PAINT_MAX_LEVEL, PAINT_MIN_LEVEL, PAINT_TANK_CAPACITY } from "../../config/colors";
import { IPaint } from "../../model/state";
import { ISetPaint, ISetPaints, SET_PAINT, SET_PAINTS, SET_PAINT_VALVE_STATE } from "../actions/actionType";
import { v4 as uuidv4 } from 'uuid';

const initialPaints: IPaint[] = Object.values(colors).map((color: ConfigColorInterface): IPaint => ({
  code: color.code,
  min_level: PAINT_MIN_LEVEL,
  max_level: PAINT_MAX_LEVEL,
  count: PAINT_INITIAL_COUNT,
  current_volume_liters: 0,
  capacity: PAINT_TANK_CAPACITY,
  count_liters: 0,
  current_volume: 0,
  valve_open: false,
  id: uuidv4(),
  name: color.name,
  ratio: 0
}))


export const paintsReducer = (state: IPaint[] = initialPaints, action: ISetPaint|ISetPaints) => {
  switch (action.type) {
    case SET_PAINT: 
      state = state.map((paint: IPaint) => {
        return (paint.id === (action.payload as IPaint).id || paint.name === (action.payload as Partial<IPaint>).name ) 
          ? {...paint, ...action.payload} as IPaint
          : paint
      })

      return state

    case SET_PAINT_VALVE_STATE:
      state = state.map((paint: IPaint) => {
        if (paint.id === (action.payload as IPaint).id) {
          return {
            ...paint,
            valve_open: (action.payload as IPaint).valve_open
          }
        }

        return paint
      })

      return state

    case SET_PAINTS:
      return (action.payload as Partial<IPaint>[]).map((paint: Partial<IPaint>) => ({
        ...state.find((statePaint: IPaint) => statePaint.id === paint.id),
        ...paint
      }))
      
    default:
      return state
  }
}