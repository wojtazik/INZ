import { IState } from "../../model/state";

const selectIsProcessRunning = (state: IState) => state.process_running

export { selectIsProcessRunning }