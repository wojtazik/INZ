import { Dispatch } from "react";
import { ISetChoosenColorName, SET_CHOOSEN_COLOR_NAME } from "./actionType";

export const setChoosenColorName = (payload: number, socket: any) => (dispatch: Dispatch<any>): void => {
  setTimeout(() => {
    socket.emit('change.choosen_color_name', payload)
  }, 500)

  dispatch(pushChoosenColorName(payload))
}

export const pushChoosenColorName = (payload: number): ISetChoosenColorName => ({
  type: SET_CHOOSEN_COLOR_NAME,
  payload
})