import { IState } from "../../model/state";

const selectChoosenColorCode = (state: IState) => state.choosen_color_code

export { selectChoosenColorCode }