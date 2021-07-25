import { IState } from "../../model/state";

const selectBakersData = (state: IState) => {
  return {
    ...state.beakers,
    current_level_percent: state.beakers.current_volume / state.beakers.capacity
  }
}

export { selectBakersData }