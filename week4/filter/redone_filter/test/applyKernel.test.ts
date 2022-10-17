import applyKernel from "../src/applyKernel"
import { Image } from "../src/interfaces"
import testImage from "./testImage"

describe("Apply kernel", () => {
    it("Applies a kernel to an image", () => {
        const realOutput: Image = applyKernel(testImage.kernel, testImage.input)
        expect(realOutput).toStrictEqual(testImage.kernelExpectedOutput)
    })
})