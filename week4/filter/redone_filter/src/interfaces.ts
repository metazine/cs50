import { deepCopyImageData } from "./filter"

export interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

export type ImageDataArray = Pixel[][]

export interface Image {
    getPixel(x: number, y: number): Pixel,
    setPixel(x: number, y: number, pixel: Pixel): void,
    width: number,
    height: number,
    data: ImageDataArray
}

export class PixelArrayImage implements Image {
    width: number
    height: number
    data: ImageDataArray
    constructor(imageData: ImageDataArray) {
        this.data = deepCopyImageData(imageData)
        this.height =  this.data.length
        this.width = this.data[0]?.length || 0  
    }
    getPixel(x: number, y: number): Pixel {
        let pixelValue: Pixel | undefined  = this.data.at(y)?.at(x)
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

