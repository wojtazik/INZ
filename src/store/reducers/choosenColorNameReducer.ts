import { ISetChoosenColorName, SET_CHOOSEN_COLOR_NAME } from "../actions/actionType";

export const choosenColorNameReducer = (state: string | null = null, action: ISetChoosenColorName) => {
  switch (action.type) {
    case SET_CHOOSEN_COLOR_NAME:
      return action.payload
    default:
      return state
  }
}