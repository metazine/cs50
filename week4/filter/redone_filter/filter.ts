import test from "node:test"
import { OutputFileType } from "typescript"

const fs = require('fs')
const bmp = require('bmp-js')

function main() {
    // LOAD IN BMP
    const inputBMPBuffer = fs.readFileSync(process.argv[3])

    const inputBMPData: DecodedBMP = bmp.decode(inputBMPBuffer)


    const rowsOfPixels = bmpDataToRowsOfPixels(inputBMPData)
    
    let filteredRowsOfPixels: Pixel[][];
    
    try {
        filteredRowsOfPixels = filterSpecs[process.argv[2]].function(rowsOfPixels)
    } 
    catch {
        console.log(`Unknown filter: "${process.argv[2]}"`)
        process.exit(1)
    }
    
    const outputRGBdata = convertPixelArrayTo1DArray(filteredRowsOfPixels)
    
    const outputBMPData = inputBMPData
    outputBMPData.data = outputRGBdata

    const outputBMPBuffer = bmp.encode(outputBMPData)
    fs.writeFileSync('output.bmp', outputBMPBuffer.data)
}

interface Pixel {
    a: number,
    r: number,
    g: number,
    b: number
}

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
function bmpDataToRowsOfPixels(bmpData: DecodedBMP): Pixel[][] {
    let rowsOfPixels: Pixel[][] = []

    const VALUES_PER_PIXEL = 4
    for (let y = 0; y < bmpData.height; y++) {
        let row: Pixel[] = []
        for (let x = 0; x < bmpData.width * VALUES_PER_PIXEL; x += VALUES_PER_PIXEL) {
            const location = y * bmpData.width * VALUES_PER_PIXEL + x
            let pixel: Pixel = {
                a: bmpData.data[location],
                r: bmpData.data[location + 3],
                g: bmpData.data[location + 2],
                b: bmpData.data[location + 1]
            }
            row.push(pixel)
        }
        rowsOfPixels.push(row)
    }
    return rowsOfPixels
}



// FILTER FUNCTIONS
interface FilterDescriptor {
    function: Function,
}

const filterSpecs: Record <string, FilterDescriptor> = {
    "-g": {
        function: greyScale
        //function: greyScale
    },
    "-e": {
        function: edgeDetection
    },
    "-c": {
        function: coloringBook
    },
    "-gb": {
        function: gaussianBlur
    }
}

function edgeDetection (inputImage: Pixel[][]): Pixel[][] {
    const gx_image = applyKernel([[1, 2, 1],[0, 0 ,0],[1, -2, 1]], inputImage)
    const gy_image = applyKernel([[1, 0, -1],[2, 0 ,-2],[1, 0, -1]], inputImage)

    
    
    // const kernel = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]]
    const height = inputImage.length
    const width = inputImage[0].length
    
    // rowsOfPixels = gaussianBlur(rowsOfPixels)

    // let filteredOutput: Pixel[][] = []
    // for (let y = 0; y < height; y++) {
    //     let row: Pixel[] = []
    //     for (let x = 0; x < width; x++) {
    //         const gx: Pixel = {
    //             a: 0,
    //             r: 0,
    //             g: 0,
    //             b: 0
    //         }
    //         const gy: Pixel = {
    //             a: 0,
    //             r: 0,
    //             g: 0,
    //             b: 0
    //         }

    //         for (let i = -1; i <= 1; i++) {
    //             for (let j = -1; j <= 1; j++) {
    //                 let yKernelPos = (y + i + height) % height;
    //                 let xKernelPos = (x + j + width) % width;

    //                 gx.r += rowsOfPixels[yKernelPos][xKernelPos].r * kernel[i + 1][j + 1];
    //                 gx.g += rowsOfPixels[yKernelPos][xKernelPos].g * kernel[i + 1][j + 1];
    //                 gx.b += rowsOfPixels[yKernelPos][xKernelPos].b * kernel[i + 1][j + 1];


                    
    //                 gy.r += rowsOfPixels[yKernelPos][xKernelPos].r * kernel[j + 1][i + 1];
    //                 gy.g += rowsOfPixels[yKernelPos][xKernelPos].g * kernel[j + 1][i + 1];
    //                 gy.b += rowsOfPixels[yKernelPos][xKernelPos].b * kernel[j + 1][i + 1];
    //             }
    //         }
    //         const filteredPixel: Pixel = {
    //             a: 0,
    //             r: Math.sqrt(gx.r * gx.r + gy.r * gy.r),
    //             g: Math.sqrt(gx.g * gx.g + gy.g * gy.g),
    //             b: Math.sqrt(gx.b * gx.b + gy.b * gy.b),
    //         }

    //         filteredPixel.r = filteredPixel.r > 255 ? 255 : filteredPixel.r
    //         filteredPixel.g = filteredPixel.g > 255 ? 255 : filteredPixel.g
    //         filteredPixel.b = filteredPixel.b > 255 ? 255 : filteredPixel.b

    //         if (filteredPixel.r < 0) {
    //             console.log(filteredPixel.r)
    //         }

    //         row.push(filteredPixel)
    //     }
    //     filteredOutput.push(row)
    // }
    // return filteredOutput
}

function coloringBook (inputImage: Pixel[][]): Pixel[][] {
    let outputImage: Pixel[][] = JSON.parse(JSON.stringify(inputImage))

    outputImage = greyScale(outputImage)
    outputImage = edgeDetection(outputImage)
    const height = outputImage.length
    const width = outputImage[0].length

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let valueSplit = 50
            outputImage[y][x].r = outputImage[y][x].r > valueSplit ? 0 : 255
            outputImage[y][x].g = outputImage[y][x].g > valueSplit ? 0 : 255
            outputImage[y][x].b = outputImage[y][x].b > valueSplit ? 0 : 255
        }
    }
    outputImage = gaussianBlur(outputImage)
    return outputImage
}


function gaussianBlur(inputImage: Pixel[][]) {
    const outputImage = applyKernel([[1, 2, 1], [2, 4, 2], [1, 2, 1]], inputImage)
    return outputImage
}

function greyScale(inputImage: Pixel[][]) {
    const outputImage = JSON.parse(JSON.stringify(inputImage))
    for (let y = 0; y < outputImage.length; y++) {
        for (let x = 0; x < outputImage[y].length; x++) {
            const averageOfColours = (outputImage[y][x].r + outputImage[y][x].g + outputImage[y][x].b) / 3
            outputImage[y][x].a = 0
            outputImage[y][x].r = averageOfColours
            outputImage[y][x].g = averageOfColours
            outputImage[y][x].b = averageOfColours
        }
    }
    return outputImage
}

function applyKernel(kernel: number[][], inputImage: Pixel[][]) {
    const height = inputImage.length
    const width = inputImage[0].length

    const kernelSize = kernel.length
    const kernelOffset = (kernelSize - 1) / 2

    let kernelTotal: number = 0;
    kernel.forEach((row) => {
        row.forEach((value) => {
            kernelTotal += value
        })
    })

    if (kernelSize % 2 == 0) {
        throw new Error("Invalid kernel size")
    }

    let output: Pixel[][] = []

    for (let y = 0; y < height; y++) {
        let row: Pixel[] = []
        for (let x = 0; x < width; x++) {
            const pixel: Pixel = {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            }
            for (let i = -kernelOffset; i <= kernelOffset; i++) {
                for (let j = -kernelOffset; j <= kernelOffset; j++) {
                    const yKernelPos = (y + i + height) % height;
                    const xKernelPos = (x + j + width) % width;

                    pixel.r += inputImage[yKernelPos][xKernelPos].r * kernel[j + 1][i + 1] / kernelTotal;
                    pixel.g += inputImage[yKernelPos][xKernelPos].g * kernel[j + 1][i + 1] / kernelTotal;
                    pixel.b += inputImage[yKernelPos][xKernelPos].b * kernel[j + 1][i + 1] / kernelTotal;
                }
            }
            row.push(pixel)
        }
        output.push(row)
    }
    return output

}
//rowsOfPixels = greyScale(rowsOfPixels)

// CONVERT FILTERED 2D ARRAY TO A 1D ARRAY
function convertPixelArrayTo1DArray(rowsOfPixels: Pixel[][]) {
    let data: number[] = []
    const height = rowsOfPixels.length
    const width = rowsOfPixels[0].length

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x ++) {
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
// OUTPUT BMP

main()