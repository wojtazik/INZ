import { IModalsState } from "../../model/state"
import { ISetModalOpen, SET_COLORS_LIST_MODAL_OPEN } from "../actions/actionType"

const initialState: IModalsState = {
  colors_list_modal_open: false
}

export const modalsOpenReducer = (state: IModalsState = initialState, action: ISetModalOpen): IModalsState => {
  switch (action.type) {
    case SET_COLORS_LIST_MODAL_OPEN: 
      return {
        ...state,
        colors_list_modal_open: action.payload
      }
    default:
      return state
  }
}