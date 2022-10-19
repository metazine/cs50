import filter from "../src/filter"
import testImage from "./testImage"


describe("filter", () => {
    it ("Rejects unknown filters", () => {
        expect(() => {filter("unknown", testImage.input)}).toThrowError(/Unknown filter type/)
    })
    
    it ("Runs greyscale filter properly", () => {
        expect(filter("greyscale", testImage.input)).toStrictEqual(testImage.greyScaleExpectedOutput)
    })

    it ("Runs edge detection filter properly", () => {
        expect(filter("edgeDetection", testImage.input)).toStrictEqual(testImage.edgeDetectionExpectedOutput)
    })

    it ("Runs gaussian blur filter properly", () => {
        expect(filter("gaussianBlur", testImage.input)).toStrictEqual(testImage.gaussianBlurExpectedOutput)
    })
})