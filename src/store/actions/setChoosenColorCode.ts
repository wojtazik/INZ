import { Dispatch } from "react";
import { ISetChoosenColorCode, SET_CHOOSEN_COLOR_CODE } from "./actionType";

export const setChoosenColorCode = (payload: string, socket: any) => (dispatch: Dispatch<any>): void => {
  socket.emit('change.choosen_color_code', payload)
}

export const pushChoosenColorCode = (payload: string): ISetChoosenColorCode => ({
  type: SET_CHOOSEN_COLOR_CODE,
  payload
})