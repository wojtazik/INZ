import { Dispatch } from "react";
import { IPaint } from "../model/state";
import { pushChoosenColorCode } from "../store/actions/setChoosenColorCode";
import { pushMixerWorking } from "../store/actions/setMixerWorking";
import { pushPaint, pushPaints } from "../store/actions/setPaints";

function processData(dispatch: Dispatch<any>, data: any) {
    const { data: processDataValues } = data
    const { 
        mixer_working,
        paints,
        choosen_color_code
     } = processDataValues

    if (mixer_working !== undefined) {
        dispatch(pushMixerWorking(mixer_working))
        paints.map((paint: Partial<IPaint>) => {
            dispatch(pushPaint(paint))
        })
    }

    if (choosen_color_code !== undefined) {
        dispatch(pushChoosenColorCode(choosen_color_code))
    }

    if (paints !== undefined) {
        dispatch(pushPaints(paints))
    }
}

export default processData