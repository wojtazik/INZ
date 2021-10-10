import { IModalsState } from "../../model/state"
import { ISetModalOpen, SET_COLORS_LIST_MODAL_OPEN, SET_COLOR_NAME_MODAL_OPEN, SET_TIME_INFO_MODAL_OPEN } from "../actions/actionType"

const initialState: IModalsState = {
  colors_list_modal_open: false,
  color_name_modal_open: false,
  time_info_modal_open: false
}

export const modalsOpenReducer = (state: IModalsState = initialState, action: ISetModalOpen): IModalsState => {
  switch (action.type) {
    case SET_COLORS_LIST_MODAL_OPEN: 
      return {
        ...state,
        colors_list_modal_open: action.payload
      }
    case SET_COLOR_NAME_MODAL_OPEN:
      return {
        ...state,
        color_name_modal_open: action.payload,
      }
    case SET_TIME_INFO_MODAL_OPEN:
      return {
        ...state,
        time_info_modal_open: action.payload
      }
    default:
      return state
  }
}