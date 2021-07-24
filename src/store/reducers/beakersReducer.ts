import { IBeakers } from "../../model/state";
import { ISetBeakers, SET_BEAKERS, SET_BEAKERS_LEVEL } from "../actions/actionType";

const initialState: IBeakers = {
  capacity: 1000,
  current_volume: 0,
  valve_open: false
}

export const beakersReducer = (state: IBeakers = initialState, action: ISetBeakers) => {
  switch(action.type) {
    case SET_BEAKERS_LEVEL: {
      return {
        ...state,
        current_volume: action.payload
      }
    }

    case SET_BEAKERS: {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state
    }
  }
}