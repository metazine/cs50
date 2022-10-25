import { ImageDataArray } from "./types"

export interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

export interface Image {
    getPixel(x: number, y: number): Pixel,
    setPixel(x: number, y: number, pixel: Pixel): void,
    width: number,
    height: number,
    data: ImageDataArray
}

export interface Bmp {
    width: number,
    height: number,
    data: number[]
}

export interface ArgvDescriptor {
    path: string,
    filterName: string
}

