import { IState } from "../../model/state";

const selectCleaningSubstance = (state: IState) => state.cleaning_substance

export {
  selectCleaningSubstance
}