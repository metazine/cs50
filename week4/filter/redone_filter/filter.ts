const fs = require('fs')
const bmp = require('bmp-js')

function main() {

}


// PROCESSING INPUT

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
// LOAD IN BMP
const inputBMPBuffer = fs.readFileSync(process.argv[3])

// CONVERT BMP TO TWO DIMENSIONAL ARRAY
function bmpBufferToRowsOfPixels() {
    let rowsOfPixels: Pixel[][] = []

    const VALUES_PER_PIXEL = 4
    for (let y = 0; y < inputBMPData.height; y++) {
        let row: Pixel[] = []
        for (let x = 0; x < inputBMPData.width * VALUES_PER_PIXEL; x += VALUES_PER_PIXEL) {
            const location = y * inputBMPData.width * VALUES_PER_PIXEL + x
            let pixel: Pixel = {
                a: inputBMPData.data[location],
                r: inputBMPData.data[location + 3],
                g: inputBMPData.data[location + 2],
                b: inputBMPData.data[location + 1]
            }
            row.push(pixel)
        }
        rowsOfPixels.push(row)
    }
}
const inputBMPData: DecodedBMP = bmp.decode(inputBMPBuffer)




// FILTER FUNCTIONS
function greyScale(rowsOfPixels: Pixel[][]) {
    for (let y = 0; y < rowsOfPixels.length; y++) {
        for (let x = 0; x < rowsOfPixels[y].length; x++) {
            const averageOfColours = (rowsOfPixels[y][x].r + rowsOfPixels[y][x].g + rowsOfPixels[y][x].b) / 3
            rowsOfPixels[y][x].a = 1
            rowsOfPixels[y][x].r = averageOfColours
            rowsOfPixels[y][x].g = averageOfColours
            rowsOfPixels[y][x].b = averageOfColours
        }
    }
    return rowsOfPixels

}

//rowsOfPixels = greyScale(rowsOfPixels)

// CONVERT FILTERED 2D ARRAY TO A 1D ARRAY
const outputBMPData: DecodedBMP = inputBMPData
outputBMPData.data = []

for (let y = 0; y < outputBMPData.height; y++) {
    for (let x = 0; x < outputBMPData.width; x ++) {
        outputBMPData.data.push (
            rowsOfPixels[y][x].a,
            rowsOfPixels[y][x].b, 
            rowsOfPixels[y][x].g, 
            rowsOfPixels[y][x].r
        )
    }
}
// OUTPUT BMP

const outputBMPBuffer = bmp.encode(outputBMPData)

fs.writeFileSync('output.bmp', outputBMPBuffer.data)