import { IBeakers, ICleaningSubstance, IError, IMixingTank, IPaint } from "../../model/state";

export interface ISetPaints {
  type: string,
  payload: IPaint[] | Partial<IPaint>[]
}

export interface ISetPaint {
  type: string,
  payload: IPaint|Partial<IPaint>
}

export interface ISetMixerWorking {
  type: string,
  payload: boolean
}

export interface ISetCleaningSubstance {
  type: string,
  payload: ICleaningSubstance
}

export interface ISetPartialCleaningSubstance {
  type: string,
  payload: Partial<ICleaningSubstance>
}

export interface ISetCleaningSubstanceValveOpen {
  type: string,
  payload: boolean
}

export interface ISetCleaningSubstanceRefill {
  type: string,
  payload: boolean
}

export interface ISetChoosenColorCode {
  type: string,
  payload: string
}

export interface ISetMixingTank {
  type: string,
  payload: Partial<IMixingTank>
}

export interface ISetPartialMixingTank {
  type: string,
  payload: Partial<IMixingTank>
}

export interface ISetErrors {
  type: string,
  payload: IError[]
}

export interface ISetProcessRunning {
  type: string,
  payload: boolean
}

export interface ISetProcessRunningSettable {
  type: string,
  payload: boolean
}

export interface ISetProcessRunningInfo {
  type: string,
  payload: boolean
}

export interface ISetPaintValveState {
  type: string,
  payload: Partial<IPaint>
}

export interface ISetBeakers {
  type: string,
  payload: Partial<IBeakers>
}

export interface ISetBeakersLevel {
  type: string,
  payload: number
}

export interface ISetModalOpen {
  type: string,
  payload: boolean
}

export interface ISetPaintRefilling {
  type: string,
  payload: {
    id: string,
    refilling: boolean,
  }
}

export interface ISetPaintsRefilling {
  type: string
}

export const SET_PAINTS = 'SET_PAINTS'
export const SET_PAINT = 'SET_PAINT'
export const SET_PAINT_VALVE_STATE = 'SET_PAINT_VALVE_STATE'
export const SET_MIXER_WORKING = 'SET_MIXER_WORKING'
export const SET_PAINT_REFILLING = 'SET_PAINT_REFILLING'
export const SET_PAINTS_REFILLING = 'SET_PAINTS_REFILLING'


export const SET_CLEANING_SUBSTANCE = 'SET_CLEANING_SUBSTANCE'
export const SET_PARTIAL_CLEANING_SUBSTANCE = 'SET_PARTIAL_CLEANING_SUBSTANCE'

export const SET_CLEANING_SUBSTANCE_VALVE_OPEN = 'SET_CLEANING_SUBSTANCE_VALVE_OPEN'
export const SET_CLEANING_SUBSTANCE_REFILL = 'SET_CLEANING_SUBSTANCE_REFILL'

export const SET_CHOOSEN_COLOR_CODE = 'SET_CHOOSEN_COLOR_CODE'
export const SET_MIXING_TANK = 'SET_MIXING_TANK'
export const SET_PARTIAL_MIXING_TANK = 'SET_PARTIAL_MIXING_TANK'

export const SET_ERRORS = 'SET_ERRORS'
export const SET_PROCESS_RUNNING = 'SET_PROCESS_RUNNING'
export const SET_PROCESS_RUNNING_SETTABLE = 'SET_PROCESS_RUNNING_SETTABLE'
export const SET_PROCESS_RUNNING_INFO = 'SET_PROCESS_RUNNING_INFO'


export const SET_BEAKERS = 'SET_BEAKERS'
export const SET_BEAKERS_LEVEL = 'SET_BEAKERS_LEVEL'

export const SET_COLORS_LIST_MODAL_OPEN = 'SET_COLORS_LIST_MODAL_OPEN'