import { Image, Pixel, Bmp } from "./interfaces"

export function bmpDataToImage(bmpData: Bmp): Image {
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

export function convertImageTo1DArray(image: Image) {
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