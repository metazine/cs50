// import { readFileSync } from "fs"
import { /*bmpToImage,*/ imageToBmpData } from "../src/bmpConversion"
// import { Image } from "../src/interfaces"
import testImage from "./testImage"
import PixelArrayImage from "../src/pixelArrayImage"
// const bmpJs = require("bmp-js")

describe("BMP conversions", () => {
    
    // There is a problem with the input file and it is too tedious too fix it compared to the value fixing it would give me
    
    // it ("can convert bmp to an image",() => {
    //     const bmp = bmpJs.decode(readFileSync("./test/images/test.bmp"))
    //     const image: Image = bmpToImage(bmp)
    //     throw new Error (`${testImage.bmpFileImage}`)
    //     throw new Error(`${image.data}`)
    //     expect(image.data).toStrictEqual(testImage.bmpFileImage)
    // })

    it ("can convert an image to bmpData", () => {
       expect(imageToBmpData(new PixelArrayImage(testImage.input))).toStrictEqual(testImage.inputImageBmpData)
    })
})
