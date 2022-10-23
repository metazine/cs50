import { Image, Pixel, Bmp, ImageDataArray, PixelArrayImage, BmpData } from "./interfaces"

export function bmpToImage(bmp: Bmp): Image {
    let imageDataArray: ImageDataArray = []
    const VALUES_PER_PIXEL: number = 4 //

    for (let y: number = 0; y < bmp.height; y++) {
        let row: Pixel[] = []
        for (let x: number = 0; x < bmp.width * VALUES_PER_PIXEL; x += VALUES_PER_PIXEL) {
            const location = y * bmp.width * VALUES_PER_PIXEL + x
            let pixel: Pixel = {
                a: bmp.data[location] || NaN,     
                r: bmp.data[location + 3] || NaN, 
                g: bmp.data[location + 2] || NaN, 
                b: bmp.data[location + 1] || NaN  
            }
            row.push(pixel)
        }
        imageDataArray.push(row)
    }
    const image: Image = new PixelArrayImage(imageDataArray)
    return image
}

export function imageToBmpData(image: Image): BmpData {
    let bmpData: BmpData = []

    for (let y: number = 0; y < image.height; y++) {
        for (let x: number = 0; x < image.width; x ++) {
            const pixel: Pixel = image.getPixel(x, y)
            bmpData.push (
                pixel.a,
                pixel.b, 
                pixel.g, 
                pixel.r
            )
        }
    }
    return bmpData
}