import { Pixel, Image, Bmp } from "./interfaces"
import filter from "./filter"
import {writeBuffer, readImageFile} from "./fileIO"
import handleArgs from "./handleArgs"

const bmpJs = require('bmp-js')

export default function main(argv: string[]) {
    const args = handleArgs(argv)
    
    // LOAD IN BMP
    const inputBMPBuffer: Buffer = readImageFile(args.path)
    const bmp: Bmp = bmpJs.decode(inputBMPBuffer)

    const image: Image = bmpDataToImage(bmp)
    const filteredImage: Image = filter(args.filterName, image)
    bmp.data = convertImageTo1DArray(filteredImage)
    
    writeBuffer('output.bmp', bmpJs.encode(bmp).data)
    return bmp
}



function bmpDataToImage(bmpData: Bmp): Image {
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

main(process.argv)