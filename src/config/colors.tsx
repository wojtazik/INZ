
export const PAINT_MIN_LEVEL = true
export const PAINT_MAX_LEVEL = false
export const PAINT_INITIAL_COUNT = 0
export const PAINT_TANK_CAPACITY = 300

export type ColorsInterface = {
    [key: string]: ConfigColorInterface
}

export type ConfigColorInterface = {
    code: string,
    name: string
}

const colors: ColorsInterface = {
    cyan: {
        name: 'cyan',
        code: '00FFFF',
    },
    magenta: {
        name: 'magenta',
        code: 'FF00FF',

    },
    yellow: {
        name: 'yellow',
        code: 'FFFF00',

    },
    white: {
        name: 'white',
        code: 'FFFFFF',

    },
    black: {
        name: 'black',
        code: '000000',
    }
}

export default colors