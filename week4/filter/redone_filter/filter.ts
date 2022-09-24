const fs = require('fs')
const bmp = require('bmp-js')

function main() {
    // LOAD IN BMP
    const inputBMPBuffer = fs.readFileSync(process.argv[3])
    const inputBMPData = bmp.decode(inputBMPBuffer)

    const rowsOfPixels = bmpDataToRowsOfPixels(inputBMPData)
    const filteredRowsOfPixels = greyScale(rowsOfPixels)
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

interface FilterSpecs {
    
}

// CONVERT BMP TO TWO DIMENSIONAL ARRAY
function bmpDataToRowsOfPixels(bmpData): Pixel[][] {
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
function greyScale(rowsOfPixels: Pixel[][]) {
    for (let y = 0; y < rowsOfPixels.length; y++) {
        for (let x = 0; x < rowsOfPixels[y].length; x++) {
            const averageOfColours = (rowsOfPixels[y][x].r + rowsOfPixels[y][x].g + rowsOfPixels[y][x].b) / 3
            rowsOfPixels[y][x].a = 0
            rowsOfPixels[y][x].r = averageOfColours
            rowsOfPixels[y][x].g = averageOfColours
            rowsOfPixels[y][x].b = averageOfColours
        }
    }
    return rowsOfPixels

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