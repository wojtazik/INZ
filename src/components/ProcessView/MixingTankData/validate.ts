import { IInputError } from "../../../model/commonTypes"
import { IMixingTank } from "../../../model/state"

type IFunctionArgs = {
  localVolumeToGain: number,
  localMixingTime: number,
  mixingTank: IMixingTank
}

const validate = ({
  localVolumeToGain,
  localMixingTime,
  mixingTank
}: IFunctionArgs) => {
  const currentErrors: IInputError[] = []

  if (localVolumeToGain < 0) {
    currentErrors.push({
      field: 'volume_to_gain',
      message: 'Nie może być mniejsze niż 0'
    })
  }

  if (localVolumeToGain > mixingTank.capacity) {
    currentErrors.push({
      field: 'volume_to_gain',
      message: `Nie może być większe niż ${mixingTank.capacity}`
    })
  }

  if (localMixingTime < 30) {
    currentErrors.push({
      field: 'mixing_time',
      message: 'Nie może być mniejsze od 30 sekund'
    })
  }

  return currentErrors
}

export default validate