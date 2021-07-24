import { IBeakers, ICleaningSubstance } from "../../model/state";
import { ISetBeakers, ISetBeakersLevel, ISetCleaningSubstance, SET_BEAKERS, SET_BEAKERS_LEVEL, SET_CLEANING_SUBSTANCE } from "./actionType";

export const setBeakers = (payload: Partial<IBeakers>): ISetBeakers => ({
  type: SET_BEAKERS,
  payload
})

export const setBeakersLevel = (payload: number): ISetBeakersLevel => ({
  type: SET_BEAKERS_LEVEL,
  payload
})