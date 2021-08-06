import { ISetModalOpen, SET_COLORS_LIST_MODAL_OPEN } from "./actionType";

export const setColorsListModalOpen = (payload: boolean): ISetModalOpen => ({
  type: SET_COLORS_LIST_MODAL_OPEN,
  payload
})
