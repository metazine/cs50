export interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

export type Image = Pixel[][]

export type kernel = readonly number[][]

export interface Bmp {
    width: number,
    height: number,
    data: number[]
}

export interface ArgvDescriptor {
    path: string,
    filterName: string
}

