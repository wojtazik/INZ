import { Id } from "../../model/commonTypes";
import { IPaint, IState } from "../../model/state";

const selectPaintDataById = (state: IState, { id }: { id: Id }): IPaint => {
  return state.paints.find((paint: IPaint) => paint.id === id) as IPaint
}

const selectPaintTanksCount = (state: IState) => {
  return state?.paints?.length || 0
}

const selectPaintsColorCodes = (state: IState) => {
  return state.paints?.reduce((acc: Id[], current: IPaint) => {
    return [...acc, current.code]
  }, [])
}

const selectPaintsIds = (state: IState) => {
  return state.paints?.reduce((acc: Id[], current: IPaint) => {
    return [...acc, current.id]
  }, [])
}

const selectPaints = (state: IState) => {
  return state.paints
}

const selectIsPaintSelected = (state: IState) => {
  return state.paints.some((paint: IPaint) => paint.count > 0)
}

export {
  selectPaintTanksCount,
  selectPaintsColorCodes,
  selectPaintsIds,
  selectPaintDataById,
  selectPaints,
  selectIsPaintSelected
}