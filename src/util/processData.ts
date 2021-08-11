import { Dispatch } from "react";
import { IPaint } from "../model/state";
import { pushChoosenColorCode } from "../store/actions/setChoosenColorCode";
import { pushCleaningSubstanceRefill, pushPartialCleaningSubstance, setCleaningSubstance } from "../store/actions/setCleaningSubstance";
import { pushMixerWorking } from "../store/actions/setMixerWorking";
import { pushPartialMixingTank } from "../store/actions/setMixingTank";
import { pushPaint, pushPaints } from "../store/actions/setPaints";
import { pushProcessRunning } from "../store/actions/setProcessRunning";

function processData(dispatch: Dispatch<any>, data: any) {
    console.log(data)
    const { success, data: processData } = data
    console.log('bce', processData, success, 'aaaaaaaaaa')
    
    if (success) {
        if (processData.mixer_working !== undefined) {
            dispatch(pushMixerWorking(processData.mixer_working))
        }
    
        if (processData.process_running !== undefined) {
            dispatch(pushProcessRunning(processData.process_running))
        }
    
        if (processData.cleaning_substsance !== undefined) {
            console.log('abc')
            dispatch(pushPartialCleaningSubstance(processData.cleaning_substsance))
        }
        console.log(processData.mixing_tank !== undefined)
        if (processData.mixing_tank !== undefined) {
            console.log('mixing tank data exists')
            dispatch(pushPartialMixingTank(processData.mixing_tank))
        }

    }
}

export default processData