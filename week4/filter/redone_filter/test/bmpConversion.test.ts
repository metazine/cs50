import { readFileSync } from "fs"
import { bmpToImage, imageToBmpData } from "../src/bmpConversion"
import { Image } from "../src/interfaces"
import testImage from "./testImage"
const bmpJs = require("bmp-js")

describe("BMP conversions", () => {
    it ("can convert bmp to an image",() => {
        const bmp = bmpJs.decode(readFileSync("./test/images/test.bmp"))
        const image: Image = bmpToImage(bmp)
        expect(image).toStrictEqual(testImage.bmpFileImage)
    })

    it ("can convert an image to bmpData", () => {
       expect(imageToBmpData(testImage.input)).toStrictEqual(testImage.inputImageBmpData)
    })
})
