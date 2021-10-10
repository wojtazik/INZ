import errors from "../../config/errors";
import { IError } from "../../model/state";
import { ISetEmergencyStop, ISetError, ISetErrors, SET_ERROR, SET_ERRORS, SET_MERGENCY_STOP } from "../actions/actionType";

export const errorsReducer = (state: IError[] = errors, action: ISetErrors | ISetError | ISetEmergencyStop) => {
  switch (action.type) {
    case SET_ERROR: {
      return [
        action.payload,
        ...state.filter((error: IError) => error.code !== (action as ISetError).payload.code),
      ]
    }
    case SET_ERRORS:
      return action.payload
    case SET_MERGENCY_STOP:
      console.log(action)
        const emergencyInfo = state.find((error: IError) =>
          error.location === 'EMERGENCY_STOP')
        if ((action as ISetEmergencyStop).payload !== (emergencyInfo as IError).is_active) {
          return [
            {
              ...emergencyInfo,
              is_active: action.payload,
              last_active_date: action.payload === true ? new Date() : emergencyInfo?.last_active_date
            },
            ...state.filter((error: IError) =>
              error.message !== 'EMERGENCY_STOP')
          ]}

          return state
    default:
      return state
  }
}