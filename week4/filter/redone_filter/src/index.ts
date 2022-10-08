
import {readFileSync, writeFileSync} from "fs";
const bmpJs = require('bmp-js')

function main() {
    const fileName: string = process.argv[3] || "-g"
    const filterType: string = process.argv[2] || "test/images/input.bmp"
    
    // LOAD IN BMP
    const inputBMPBuffer: Buffer = readFileSync(fileName)
    const BMPData: DecodedBMP = bmpJs.decode(inputBMPBuffer)

    const image: Pixel[][] = bmpDataToImage(BMPData)
    const filteredImage: Pixel[][] = filter(filterType, image)
    BMPData.data = convertImageTo1DArray(filteredImage)
    
    writeFileSync('output.bmp', bmpJs.encode(BMPData).data)
}


interface Pixel {
    a: number, // alpha (opacity)
    r: number, // red
    g: number, // green
    b: number // blue
}

type Image = Pixel[][]

interface DecodedBMP {
    width: number,
    height: number,
    data: number[]
}

// CONVERT BMP TO TWO DIMENSIONAL ARRAY
function bmpDataToImage(bmpData: DecodedBMP): Image {
    let image: Image = []
    const VALUES_PER_PIXEL: number = 4 //

    for (let y: number = 0; y < bmpData.height; y++) {
        let row: Pixel[] = []
        for (let x: number = 0; x < bmpData.width * VALUES_PER_PIXEL; x += VALUES_PER_PIXEL) {
            const location = y * bmpData.width * VALUES_PER_PIXEL + x
            let pixel: Pixel = {
                a: bmpData.data[location] || NaN,     
                r: bmpData.data[location + 3] || NaN, 
                g: bmpData.data[location + 2] || NaN, 
                b: bmpData.data[location + 1] || NaN  
            }
            row.push(pixel)
        }
        image.push(row)
    }
    return image
}

// FILTER FUNCTIONS
function filter(filterName: string, inputImage: Image) {
    const filterFunction: Function | undefined = filterSpecs[filterName]
    if (filterFunction) {
        return filterFunction(inputImage)
    }
    else {
        console.log(`Unknown filter: "${filterName}"`)
        process.exit(1)
    }
}

const filterSpecs: Record <string, Function> = {
    "-g": greyScale,
    "-e": edgeDetection,
    "-c": coloringBook,
    "-gb": gaussianBlur
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
                console.log("Image array is not 2 dimensional")
                process.exit(1)
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

function applyKernel(kernel: number[][], inputImage: Image) {
    const height: number = inputImage.length
    const width: number = inputImage[0]?.length || 0
    const kernelSize: number = kernel.length
    const kernelMiddle: number = (kernelSize - 1) / 2

    let kernelTotal: number = 0;
    kernel.forEach((row) => {
        row.forEach((value) => {
            kernelTotal += value
        })
    })

    kernelTotal = kernelTotal || 1

    if (kernelSize % 2 == 0) {
        throw new Error("Invalid kernel size")
    }

    let output: Pixel[][] = []

    for (let y: number = 0; y < height; y++) {
        let row: Pixel[] = []
        for (let x: number = 0; x < width; x++) {
            const pixel: Pixel = {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            }
            for (let i: number = -kernelMiddle; i <= kernelMiddle; i++) {
                for (let j: number = -kernelMiddle; j <= kernelMiddle; j++) {
                    const yKernelPos: number = (y + i + height) % height;
                    const xKernelPos: number = (x + j + width) % width;
                    
                    const kernelPosPixel: Pixel | undefined = inputImage[yKernelPos]?.[xKernelPos]
                    const kernelValue: number | undefined = kernel[j + 1]?.[i + 1]

                    if (!kernelValue) {
                        console.log("No kernel value given")
                        process.exit(1)
                    }
                    if (!kernelPosPixel) {
                        console.log("Image array is invalid")
                        process.exit(1)
                    }

                    pixel.r += kernelPosPixel.r * kernelValue / kernelTotal;
                    pixel.g += kernelPosPixel.g * kernelValue / kernelTotal;
                    pixel.b += kernelPosPixel.b * kernelValue / kernelTotal;
                }
            }
            row.push(pixel)
        }
        output.push(row)
    }
    return output

}

function deepCopyImage(inputImage: Image): Image {
    return JSON.parse(JSON.stringify(inputImage))
}

// CONVERT FILTERED 2D ARRAY TO A 1D ARRAY
function convertImageTo1DArray(image: Image) {
    let data: number[] = []
    const height: number = image.length
    const width: number = image[0]?.length || 0

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x ++) {
            const pixel: Pixel | undefined = image[y]?.[x]
            if (!pixel) {
                console.log("Image is not two dimensional array")
                process.exit(1)
            }

            data.push (
                pixel.a,
                pixel.b, 
                pixel.g, 
                pixel.r
            )
        }
    }
    return data
}

main()