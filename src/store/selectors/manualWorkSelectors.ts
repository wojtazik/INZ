import { IState } from "../../model/state";

const selectIsManualMode = (state: IState) => {

    return state.manual_work
}

export { selectIsManualMode }