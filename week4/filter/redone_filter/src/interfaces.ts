import { deepCopyImage } from "./filter"

export interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

export type ImageData = Pixel[][]

export interface Image {
    getPixel(x: number, y: number): Pixel,
    setPixel(x: number, y: number, pixel: Pixel): void,
    width: number,
    height: number,
    data: ImageData
}

export class PixelArrayImage implements Image {
    width: number
    height: number
    data: ImageData
    constructor(imageData: ImageData) {
        this.data = deepCopyImage(imageData)
        this.height =  this.data.length
        this.width = this.data[0]?.length || 0  
    }
    getPixel(x: number, y: number): Pixel {
        let pixelValue: Pixel | undefined  = this.data[y]?.[x]
        if (pixelValue === undefined) {
            throw new Error(`Position ${x}, ${y} doesn't exist`)
        }
        return pixelValue
    }
    setPixel(x: number, y: number, pixel: Pixel): void {
        if (this.data[y]?.[x] === undefined) {
            throw new Error(`Position ${x}, ${y} doesn't exist`)
        }       
        
        //@ts-ignore I've already tested the array but typescript still rejects this
        this.data[y][x] = pixel
    }
}



export type Kernel = readonly number[][]

export interface Bmp {
    width: number,
    height: number,
    data: number[]
}

export interface ArgvDescriptor {
    path: string,
    filterName: string
}

