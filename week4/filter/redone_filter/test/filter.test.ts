import filter from "../src/filter"
import PixelArrayImage from "../src/pixelArrayImage"
import testImage from "./testImage"

describe("filter", () => {
    const inputImage = new PixelArrayImage(testImage.input)

    it ("Rejects unknown filters", () => {
        expect(() => {filter("unknown", inputImage)}).toThrowError(/Unknown filter type/)
    })

    it ("Runs greyscale filter properly", () => {
        expect(filter("greyscale", inputImage).data).toStrictEqual(testImage.greyScaleExpectedOutput)
    })

    it ("Runs edge detection filter properly", () => {
        expect(filter("edgeDetection", inputImage).data).toStrictEqual(testImage.edgeDetectionExpectedOutput)
    })

    it ("Runs coloring book filter properly", () => {
        expect(filter("coloringBook", inputImage).data).toStrictEqual(testImage.coloringBookExpectedOutput)
    })

    it ("Runs gaussian blur filter properly", () => {
        expect(filter("gaussianBlur", inputImage).data).toStrictEqual(testImage.gaussianBlurExpectedOutput)
    })
})