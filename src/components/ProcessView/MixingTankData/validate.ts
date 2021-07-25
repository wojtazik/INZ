import { IInputError } from "../../../model/commonTypes"
import { IMixingTank } from "../../../model/state"

type IFunctionArgs = {
  localVolumeToGain: number,
  mixingTank: IMixingTank
}

const validate = ({
  localVolumeToGain,
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

  return currentErrors
}

export default validate