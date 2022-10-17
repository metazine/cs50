import { Image, Pixel } from "./interfaces"
import applyKernel from "./applyKernel"

export default function filter(filterName: string, inputImage: Image) {
    const filterFunction: Function | undefined = filterSpecs[filterName]
    if (filterFunction) {
        return filterFunction(inputImage)
    }
    else {
        throw new Error("Unknown filter type")
    }
}

const filterSpecs: Record <string, Function> = {
    "greyscale": greyScale,
    "edgeDetection": edgeDetection,
    "coloringBook": coloringBook,
    "gaussianBlur": gaussianBlur
}

function edgeDetection (inputImage: Image): Image {
    const gy_image: Image = applyKernel([
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1]
    ], inputImage)

    const gx_image: Image = applyKernel([
        [1, 0, -1],
        [2, 0, -2],
        [1, 0, -1]
    ], inputImage)
   
    const height: number = inputImage.length
    const width: number = inputImage[0]?.length || 0

    let outputImage: Image = []

    for (let y: number = 0; y < height; y++) {
        let row: Pixel[] = []
        for (let x: number = 0; x < width; x++) {
            const gxPixel: Pixel | undefined = gx_image[y]?.[x]
            const gyPixel: Pixel | undefined = gy_image[y]?.[x]
            
            if (!gxPixel || !gyPixel) {
                throw new Error("Image array is not 2 dimensional")
            }

            const pixel: Pixel = {
                a: 0,
                r: Math.sqrt(Math.pow(gxPixel.r, 2) + Math.pow(gyPixel.r, 2)),
                g: Math.sqrt(Math.pow(gxPixel.g, 2) + Math.pow(gyPixel.g, 2)),
                b: Math.sqrt(Math.pow(gxPixel.b, 2) + Math.pow(gyPixel.b, 2))
            }
            row.push(pixel)
        }
        outputImage.push(row)
    }
    return outputImage
}

function coloringBook (inputImage: Image): Image {
    let outputImage: Image = deepCopyImage(inputImage)

    outputImage = greyScale(outputImage)
    outputImage = edgeDetection(outputImage)
    
    const height: number = outputImage.length
    const width: number = outputImage[0]?.length || 0

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let valueSplit: number = 50
            const pixel: Pixel | undefined = outputImage[y]?.[x] || undefined

            if (!pixel) {
                console.log("pixel array is not two dimensional")
                process.exit(1)
            }
            if(!outputImage[y]?.[x]) {
                console.log("outputImage is not two dimensional")
                process.exit(1)
            }
            
            pixel.r = pixel.r > valueSplit ? 0 : 255
            pixel.g = pixel.g > valueSplit ? 0 : 255
            pixel.b = pixel.b > valueSplit ? 0 : 255
            
            //@ts-ignore
            outputImage[y][x] = pixel
        }
    }
    outputImage = gaussianBlur(outputImage)
    return outputImage
}


function gaussianBlur(inputImage: Pixel[][]): Pixel[][] {
    return applyKernel([[1, 2, 1], [2, 4, 2], [1, 2, 1]], inputImage) 
}

function greyScale(inputImage: Image): Image {
    const outputImage: Image = deepCopyImage(inputImage)

    if (!outputImage[0]?.[0]) {
        process.exit(1)
    }

    for (let y: number = 0; y < outputImage.length; y++) {
        for (let x: number = 0; x < (outputImage[y]?.length || 0); x++) {
            const pixel: Pixel | undefined = outputImage[y]?.[x]

            if (!pixel) {
                console.log("outputImage is not a two dimensional array")
                process.exit(1)
            }
            const averageOfColours: number = (pixel.r + pixel.g + pixel.b) / 3
            pixel.r = averageOfColours
            pixel.g = averageOfColours
            pixel.b = averageOfColours
            
            //@ts-ignore
            outputImage[y][x] = pixel
        }
    }
    return outputImage
}


function deepCopyImage(inputImage: Image): Image {
    return JSON.parse(JSON.stringify(inputImage))
}