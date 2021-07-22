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

export {
  selectPaintTanksCount,
  selectPaintsColorCodes,
  selectPaintsIds,
  selectPaintDataById
}