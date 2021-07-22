import { ISetChoosenColorCode, SET_CHOOSEN_COLOR_CODE } from "./actionType";

export const setChoosenColorCode = (payload: string): ISetChoosenColorCode => ({
  type: SET_CHOOSEN_COLOR_CODE,
  payload
})