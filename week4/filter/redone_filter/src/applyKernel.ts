import { Image, Pixel, Kernel, PixelArrayImage } from "./interfaces"

export default function applyKernel(kernel: Kernel, input: Image) {
    const kernelSize: number = kernel.length
    const kernelMiddle: number = (kernelSize - 1) / 2

    let kernelTotal = 0;
    kernel.forEach((row) => {
        row.forEach((value) => {
            kernelTotal += value
        })
    })

    kernelTotal = kernelTotal || 1

    if (kernelSize % 2 == 0) {
        throw new Error("Invalid kernel size")
    }

    let output = new PixelArrayImage(input.data)

    for (let y = 0; y < input.height; y++) {
        for (let x = 0; x < input.width; x++) {
            const pixel: Pixel = {
                a: 0,
                r: 0,
                g: 0,
                b: 0
            }
            for (let i = -kernelMiddle; i <= kernelMiddle; i++) {
                for (let j = -kernelMiddle; j <= kernelMiddle; j++) {
                    const relativePixel: Pixel | undefined = input.getPixel(x + j, y + i)
                    const kernelValue: number = kernel[j + 1]?.[i + 1] || 0

                    if (relativePixel === undefined) {
                        throw new Error("Image array is invalid")
                    }
 
                    pixel.r += relativePixel.r * kernelValue / kernelTotal;
                    pixel.g += relativePixel.g * kernelValue / kernelTotal;
                    pixel.b += relativePixel.b * kernelValue / kernelTotal;
                }
            }
            output.setPixel(x, y, pixel)
        }
    }
    return output
}