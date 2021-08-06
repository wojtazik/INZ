import { IState } from "../../model/state";

const selectIsColorsListModalOpen = (state: IState) => state.modalsState.colors_list_modal_open

export {
  selectIsColorsListModalOpen
}