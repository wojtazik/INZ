
export interface IPaint {
  id: string,
  capacity: number, //
  current_volume: number, //
  current_volume_liters: number,
  code: string,
  name: string,
  ratio: number,
  count: number
  count_liters: number, //
  valve_open: boolean, //
  max_level: boolean, //
  min_level: boolean,//,
  refill: boolean
}

export interface ICleaningSubstance {
  id: string,
  capacity: number,
  current_volume: number,
  current_volume_liters: number,
  valve_open: boolean,
  max_level: boolean,
  min_level: boolean,
  refill: boolean,
  cleaning_time: number,
  cleaning_time_remaining: number
}

export interface IMixingTank {
  id: string,
  volume_to_gain: number,
  mixing_time_seconds: number,
  mixing_time_seconds_remaining: number,
  current_volume: number,
  current_volume_liters: number,
  capacity: number,
  valve_open: boolean,
  valve_open_read: boolean,
}

export interface IBeakers {
  capacity: number,
  current_volume: number
  valve_open: boolean
}

export interface IModalsState {
  colors_list_modal_open: boolean
  color_name_modal_open: boolean,
  time_info_modal_open: boolean
}

export interface IProcessRunning {
  settable: boolean
  info: boolean
}

export interface IError {
  is_active: boolean,
  message: string,
  last_active_date: Date | null,
  code: number,
  location: string
}

export interface IState {
  paints: IPaint[],
  mixer_working: boolean,
  cleaning_substance: ICleaningSubstance,
  choosen_color_code: string,
  choosen_color_name: string,
  mixing_tank: IMixingTank
  errors: IError[],
  process_running: IProcessRunning
  beakers: IBeakers,
  modalsState: IModalsState
  manual_work: boolean,
}