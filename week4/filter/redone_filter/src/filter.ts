import { Image, Pixel } from "./interfaces"
import PixelArrayImage from "./pixelArrayImage"
import applyKernel from "./applyKernel"

export default function filter(filterName: string, inputImage: Image) {
    const applyFilter: Function | undefined = filterSpecs[filterName]
    if (applyFilter === undefined) {
        throw new Error("Unknown filter type")
    }
    return applyFilter(inputImage)
}

const filterSpecs: Record <string, Function> = {
    "greyscale": greyScale,
    "edgeDetection": edgeDetection,
    "coloringBook": coloringBook,
    "gaussianBlur": gaussianBlur
}

function edgeDetection (input: Image): Image {
    const gyImage: Image = applyKernel([
        [1, 0, -1],
        [2, 0, -2],
        [1, 0, -1]
    ], input)

    const gxImage: Image = applyKernel([
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]
    ], input)
   
    let output: Image = new PixelArrayImage(input.data)

    for (let y: number = 0; y < input.height; y++) {
        for (let x: number = 0; x < input.width; x++) {
            const gxPixel: Pixel = gxImage.getPixel(x, y)
            const gyPixel: Pixel = gyImage.getPixel(x, y)
            
            const pixel: Pixel = {
                a: 0,
                r: Math.sqrt(Math.pow(gxPixel.r, 2) + Math.pow(gyPixel.r, 2)),
                g: Math.sqrt(Math.pow(gxPixel.g, 2) + Math.pow(gyPixel.g, 2)),
                b: Math.sqrt(Math.pow(gxPixel.b, 2) + Math.pow(gyPixel.b, 2))
            }
            output.setPixel(x, y, pixel)
        }
    }
    return output
}

function coloringBook (input: Image): Image {
    let output: Image = new PixelArrayImage(input.data)

    output = greyScale(output)
    output = edgeDetection(output)

    for (let y: number = 0; y < output.height; y++) {
        for (let x: number = 0; x < output.width; x++) {
            let valueSplit: number = 50
            const pixel: Pixel = output.getPixel(x, y)
            
            pixel.r = pixel.r > valueSplit ? 0 : 255
            pixel.g = pixel.g > valueSplit ? 0 : 255
            pixel.b = pixel.b > valueSplit ? 0 : 255
            
            output.setPixel(x, y, pixel)
        }
    }
    output = gaussianBlur(output)
    
    return output
}


function gaussianBlur(input: Image): Image {
    return applyKernel([[1, 2, 1], [2, 4, 2], [1, 2, 1]], input) 
}

function greyScale(input: Image): Image {
    const output = new PixelArrayImage(input.data)

    for (let y: number = 0; y < output.height; y++) {
        for (let x: number = 0; x < output.width; x++) {
            const pixel: Pixel = output.getPixel(x, y)
            const averageOfColours: number = (pixel.r + pixel.g + pixel.b) / 3
            
            pixel.r = averageOfColours
            pixel.g = averageOfColours
            pixel.b = averageOfColours
         
            output.setPixel(x, y, pixel)
        }
    }
    return output
}


