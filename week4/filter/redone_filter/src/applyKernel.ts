import { Image, Pixel, Kernel } from "./interfaces"

export default function applyKernel(kernel: Kernel, inputImage: Image) {
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

    let output: Image = []

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
                    const kernelValue: number = kernel[j + 1]?.[i + 1] || 0

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