import { Dispatch } from "react";
import { IPaint } from "../model/state";
import { pushChoosenColorCode } from "../store/actions/setChoosenColorCode";
import { pushCleaningSubstanceRefill, pushPartialCleaningSubstance, setCleaningSubstance } from "../store/actions/setCleaningSubstance";
import { setErrors } from "../store/actions/setErrors";
import { pushMixerWorking } from "../store/actions/setMixerWorking";
import { pushPartialMixingTank } from "../store/actions/setMixingTank";
import { pushPaint, pushPaints, setPaint } from "../store/actions/setPaints";
import { pushProcessRunning } from "../store/actions/setProcessRunning";

function processData(dispatch: Dispatch<any>, data: any) {
    const { success, data: processData } = data

    console.log(processData)
    
    if (success) {
        if (processData.mixer_working !== undefined) {
            dispatch(pushMixerWorking(processData.mixer_working))
        }
    
        if (processData.process_running !== undefined) {
            dispatch(pushProcessRunning(processData.process_running))
        }
    
        if (processData.cleaning_substsance !== undefined) {
            dispatch(pushPartialCleaningSubstance(processData.cleaning_substsance))
        }
        if (processData.mixing_tank !== undefined) {
            dispatch(pushPartialMixingTank(processData.mixing_tank))
        }

        if (processData.paints !== undefined) {
            processData.paints.forEach((paint: Partial<IPaint>) => {
                dispatch(setPaint(paint))
            })
        }

        if (processData.errors && processData.errors.length) {
            dispatch(setErrors(processData.errors))
        }

    }
}

export default processData