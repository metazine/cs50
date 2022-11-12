import applyKernel from "../src/applyKernel"
import { Image } from "../src/interfaces"
import testImage from "./testImage"
import PixelArrayImage from "../src/pixelArrayImage"

describe("Apply kernel", () => {
    it("Applies a kernel to an image", () => {
        const realOutput: Image = applyKernel(testImage.kernel, new PixelArrayImage(testImage.input))
        expect(realOutput.data).toStrictEqual(testImage.kernelExpectedOutput)
    })
})