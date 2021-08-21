export type Id = string

export type TankCurrentLevelData = {
  name?: string | null,
  capacity?: number,
  current_level?: number,
  current_volume_percent?: number,
  color?: string | undefined | null
}

export type IInputError = {
  field: string,
  message: string
}