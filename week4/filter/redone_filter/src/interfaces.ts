import { deepCopyImageData } from "./filter"

export interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

export type ImageDataArray = Pixel[][]

export type BmpData = number[]

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
        // makes x and y wrap around if they are not within the bounds of the array size
        y = y >= 0 ? (y < this.height ? y : 0) : this.height - 1
        x = x >= 0 ? (x < this.width ? x : 0) : this.width - 1

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
        
        //@ts-ignore
        this.data[y]?.[x] = pixel
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

