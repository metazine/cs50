
import {readFileSync, writeFileSync} from "fs";
import {bmp as bmpJs} from "bmp-js"

function main() {
    const fileName: string = process.argv[3] || "-g"
    const filterType: string = process.argv[2] || "test/images/input.bmp"
    
    // LOAD IN BMP
    const inputBMPBuffer: Buffer = readFileSync(fileName)
    const BMPData: DecodedBMP = bmpJs.decode(inputBMPBuffer)

    const image: Pixel[][] = bmpDataToImage(BMPData)
    const filteredImage: Pixel[][] = filter(filterType, image)
    BMPData.data= convertImageTo1DArray(filteredImage)
    
    writeFileSync('output.bmp', bmpJs.encode(BMPData).data)
}


interface Pixel {
    a: number,
    r: number,
    g: number,
    b: number
}

type Image = Pixel[][]

interface DecodedBMP {
    fileSize: number,
    reserved: number,
    offset: number,
    headerSize: number,
    width: number,
    height: number,
    planes: number
    bitPP: number,
    compress: number,
    rawSize: number,
    hr: number,
    vr: number,
    colors: number,
    importantColors: number,
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
                // BMP files are stored as abgr
                a: bmpData.data[location] || NaN, // alpha (opacity)
                r: bmpData.data[location + 3] || NaN, // red
                g: bmpData.data[location + 2] || NaN, // green
                b: bmpData.data[location + 1] || NaN // blue
            }
            row.push(pixel)
        }
        image.push(row)
    }
    return image
}

// FILTER FUNCTIONS
function filter(filterName: string, inputImage: Image) {
    // try {
    //     return filterSpecs[filterName].function(inputImage)
    // } 
    // catch {
    //     console.log(`Unknown filter: "${filterName}"`)
    //     process.exit(1)
    // }

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
            const pixel: Pixel = {
                a: 0,
                r: Math.sqrt(Math.pow(gx_image[y]?.[x].r, 2) + Math.pow(gy_image[y][x].r, 2)),
                g: Math.sqrt(Math.pow(gx_image[y]?[x].g, 2) + Math.pow(gy_image[y][x].g, 2)),
                b: Math.sqrt(Math.pow(gx_image[y]?[x].b, 2) + Math.pow(gy_image[y][x].b, 2))
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
    const width: number = outputImage[0].length

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x++) {
            let valueSplit: number = 50
            outputImage[y][x].r = outputImage[y][x].r > valueSplit ? 0 : 255
            outputImage[y][x].g = outputImage[y][x].g > valueSplit ? 0 : 255
            outputImage[y][x].b = outputImage[y][x].b > valueSplit ? 0 : 255
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

    if (outputImage[0][0] === undefined) {
        process.exit(1)
    }

    for (let y: number = 0; y < outputImage.length; y++) {
        for (let x: number = 0; x < outputImage[y].length; x++) {
            const averageOfColours: number = (outputImage[y][x].r + outputImage[y][x].g + outputImage[y][x].b) / 3
            outputImage[y][x].a = 0
            outputImage[y][x].r = averageOfColours
            outputImage[y][x].g = averageOfColours
            outputImage[y][x].b = averageOfColours
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
function convertImageTo1DArray(rowsOfPixels: Pixel[][]) {
    let data: number[] = []
    const height: number = rowsOfPixels.length
    const width: number = rowsOfPixels[0].length

    for (let y: number = 0; y < height; y++) {
        for (let x: number = 0; x < width; x ++) {
            data.push (
                rowsOfPixels[y][x].a,
                rowsOfPixels[y][x].b, 
                rowsOfPixels[y][x].g, 
                rowsOfPixels[y][x].r
            )
        }
    }
    return data
}

main()