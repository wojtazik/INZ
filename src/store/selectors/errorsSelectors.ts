import { IState } from "../../model/state";

const selectErrors = (state: IState) => state.errors

export {
  selectErrors
}