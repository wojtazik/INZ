import { combineReducers } from "redux";
import { choosenColorCodeReducer } from "./choosenColorCodeReducer";
import { cleaningSubstanceReducer } from "./cleaningSubstanceReducer";
import { errorsReducer } from "./errorsReducer";
import { mixerWorkingReducer } from "./mixerWorkingReducer";
import { mixingTankReducer } from "./mixingTankReducer";
import { paintsReducer } from "./paintsReducer";
import { processRunningReducer } from "./processRunningReducer";

export default combineReducers({
  paints: paintsReducer,
  cleaning_substance: cleaningSubstanceReducer,
  mixer_working: mixerWorkingReducer,
  choosen_color_code: choosenColorCodeReducer,
  mixing_tank: mixingTankReducer,
  errors: errorsReducer,
  process_running: processRunningReducer
})