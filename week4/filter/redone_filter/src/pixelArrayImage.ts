import { Image, Pixel } from "./interfaces"
import { ImageDataArray } from "./types"

export default class PixelArrayImage implements Image {
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

        let pixel: Pixel | undefined  = this.data[y]?.[x]

        if (pixel === undefined) {
            throw new Error(`Position ${x}, ${y} doesn't exist`)
        }
        return pixel
    }

    setPixel(x: number, y: number, pixel: Pixel): void {
        if (this.data[y]?.[x] === undefined) {
            throw new Error(`Position ${x}, ${y} doesn't exist`)
        }       
        
        //@ts-ignore
        this.data[y]?.[x] = pixel
    }
}

function deepCopyImageData(imageData: ImageDataArray): ImageDataArray {
    return JSON.parse(JSON.stringify(imageData))
}