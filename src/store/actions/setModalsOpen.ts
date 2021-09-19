import { ISetModalOpen, SET_COLORS_LIST_MODAL_OPEN, SET_COLOR_NAME_MODAL_OPEN } from "./actionType";

export const setColorsListModalOpen = (payload: boolean): ISetModalOpen => ({
  type: SET_COLORS_LIST_MODAL_OPEN,
  payload
})

export const setColorNameModalOpen = (payload: boolean): ISetModalOpen => ({
  type: SET_COLOR_NAME_MODAL_OPEN,
  payload
})