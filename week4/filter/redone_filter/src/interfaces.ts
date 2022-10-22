export interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

export type ImageData = Pixel[][]

interface Image {
    getPixel(x: number, y: number): Pixel,
    setPixel(x: number, y: number, pixel: Pixel): Pixel,
    width: number,
    height: number,
    data: ImageData
}

class pixelArrayImage implements Image {
    width: number
    height: number
    data: ImageData
    constructor(imageData: ImageData) {
        this.data = imageData
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
    setPixel(x: number, y: number, pixel: Pixel): Pixel {
        
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

