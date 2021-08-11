import { ISetChoosenColorCode, SET_CHOOSEN_COLOR_CODE } from "../actions/actionType";

export const choosenColorCodeReducer = (state: string | null = null, action: ISetChoosenColorCode) => {
  switch (action.type) {
    case SET_CHOOSEN_COLOR_CODE:
      return action.payload
    default:
      return state
  }
}