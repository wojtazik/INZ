import { combineReducers } from "redux";
import { beakersReducer } from "./beakersReducer";
import { choosenColorCodeReducer } from "./choosenColorCodeReducer";
import { cleaningSubstanceReducer } from "./cleaningSubstanceReducer";
import { errorsReducer } from "./errorsReducer";
import { mixerWorkingReducer } from "./mixerWorkingReducer";
import { mixingTankReducer } from "./mixingTankReducer";
import { paintsReducer } from "./paintsReducer";
import { processRunningReducer } from "./processRunningReducer";
import { modalsOpenReducer } from "./modalsOpenReducer";
import { manualWorkReducer } from "./manualWorkReducer";

export default combineReducers({
  paints: paintsReducer,
  cleaning_substance: cleaningSubstanceReducer,
  mixer_working: mixerWorkingReducer,
  choosen_color_code: choosenColorCodeReducer,
  mixing_tank: mixingTankReducer,
  errors: errorsReducer,
  process_running: processRunningReducer,
  beakers: beakersReducer,
  modalsState: modalsOpenReducer,
  manual_work: manualWorkReducer
})