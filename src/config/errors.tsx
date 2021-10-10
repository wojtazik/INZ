import { IError } from "../model/state";

const errors: IError[] = [
    {
        code: 0,
        is_active: false,
        last_active_date: null,
        message: 'Zbyt mało farby w zbiorniku CYAN',
        location: 'VOLUME_CYAN'
    },
    {
        code: 1,
        is_active: false,
        last_active_date: null,
        message: 'Zbyt mało farby w zbiorniku MAGENTA',
        location: 'VOLUME_MAGENTA'
    },
    {
        code: 2,
        is_active: false,
        last_active_date: null,
        message: 'Zbyt mało farby w zbiorniku YELLOW',
        location: 'VOLUME_YELLOW'
    },
    {
        code: 3,
        is_active: false,
        last_active_date: null,
        message: 'Zbyt mało farby w zbiorniku WHITE',
        location: 'VOLUME_WHITE'
    },
    {
        code: 4,
        is_active: false,
        last_active_date: null,
        message: 'Zbyt mało farby w zbiorniku BLACK',
        location: 'VOLUME_BLACK'
    },
    {
        code: 5,
        is_active: false,
        last_active_date: null,
        message: 'Zbyt mało czyściwa',
        location: 'VOLUME_CLEANING_SUBSTANCE'
    },
    {
        code: 6,
        is_active: false,
        last_active_date: null,
        message: 'Nie można wystartować. Trwa uzupełnianie zbiornika z farbą',
        location: 'START_WHEN_REFILLING_PAINT'
    },
    {
        code: 7,
        is_active: false,
        last_active_date: null,
        message: 'Nie można wystartować. Proces w toku',
        location: 'START_WHEN_PROCESS_RUNNING'
    },
    {
        code: 8,
        is_active: false,
        last_active_date: null,
        message: 'Nie można wystartować. Mieszadło w ruchu',
        location: 'START_WHEN_MIXER_WORKING'
    },
    {
        code: 9,
        is_active: false,
        last_active_date: null,
        message: 'Próba uruchomienia automatycznego procesu w trybie ręcznym',
        location: 'START_WHEN_MANUAL_MODE'
    },
    {
        code: 10,
        is_active: false,
        last_active_date: null,
        message: 'Próba otwarcia zaworu zaworu CYAN w trybie automatycznym',
        location: 'VALVE_OPEN_AUTO_MODE_CYAN'
    },
    {
        code: 11,
        is_active: false,
        last_active_date: null,
        message: 'Próba otwarcia zaworu zaworu MAGENTA w trybie automatycznym',
        location: 'VALVE_OPEN_AUTO_MODE_MAGENTA'
    },
    {
        code: 12,
        is_active: false,
        last_active_date: null,
        message: 'Próba otwarcia zaworu zaworu YELLOW w trybie automatycznym',
        location: 'VALVE_OPEN_AUTO_MODE_YELLOW'
    },
    {
        code: 13,
        is_active: false,
        last_active_date: null,
        message: 'Próba otwarcia zaworu zaworu WHITE w trybie automatycznym',
        location: 'VALVE_OPEN_AUTO_MODE_WHITE'
    },
    {
        code: 14,
        is_active: false,
        last_active_date: null,
        message: 'Próba otwarcia zaworu zaworu BLACK w trybie automatycznym',
        location: 'VALVE_OPEN_AUTO_MODE_BLACK'
    },
    {
        code: 15,
        is_active: false,
        last_active_date: null,
        message: 'Uruchomiony wyłącznik awaryjny',
        location: 'EMERGENCY_STOP'
    },
    {
        code: 16,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego uruchomienia mieszadła w trybie automatycznym',
        location: 'MIXER_RUN_WHEN_AUTO_MODE'
    },
    {
        code: 17,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego otwarcia zaworu CYAN podczas działającego procesu',
        location: 'OPEN_VALVE_WHEN_PROCESS_RUNNING_CYAN'
    },
    {
        code: 18,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego otwarcia zaworu MAGENTA podczas działającego procesu',
        location: 'OPEN_VALVE_WHEN_PROCESS_RUNNING_MAGENTA'
    },
    {
        code: 19,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego otwarcia zaworu YELLOW podczas działającego procesu',
        location: 'OPEN_VALVE_WHEN_PROCESS_RUNNING_YELLOW'
    },
    {
        code: 20,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego otwarcia zaworu WHITE podczas działającego procesu',
        location: 'OPEN_VALVE_WHEN_PROCESS_RUNNING_WHITE'
    },
    {
        code: 21,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego otwarcia zaworu BLACK podczas działającego procesu',
        location: 'OPEN_VALVE_WHEN_PROCESS_RUNNING_BLACK'
    },
    {
        code: 22,
        is_active: false,
        last_active_date: null,
        message: 'Próba ręcznego otwarcia zaworu czyściwa podczas działającego procesu',
        location: 'OPEN_VALVE_WHEN_PROCESS_RUNNING_CLEANING_SUBSTANCE'
    },
]

export default errors