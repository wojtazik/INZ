import { IState } from "../../model/state";

const selectIsMixerWorking = (state: IState) => state.mixer_working

export { selectIsMixerWorking }