import { Dispatch } from "react";
import { createExportDefault } from "typescript";
import { IPaint } from "../model/state";
import { pushMixerWorking, setMixerWorking } from "../store/actions/setMixerWorking";
import { pushPaint } from "../store/actions/setPaints";

function processData(dispatch: Dispatch<any>, data: any) {
    const { data: processDataValus } = data
    const { 
        mixer_working,
        paints
     } = processDataValus

    if (mixer_working !== undefined) {
        dispatch(pushMixerWorking(mixer_working))
        paints.map((paint: Partial<IPaint>) => {
            dispatch(pushPaint(paint))
        })
    }
}

export default processData