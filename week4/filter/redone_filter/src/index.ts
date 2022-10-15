import { Image, Bmp } from "./interfaces"
import filter from "./filter"
import { writeBuffer, readImageFile } from "./fileIO"
import handleArgs from "./handleArgs"
import { bmpDataToImage, convertImageTo1DArray } from "./bmpConversion"

const bmpJs = require('bmp-js')
const args = handleArgs(process.argv)
const inputBMPBuffer: Buffer = readImageFile(args.path)
const bmp: Bmp = bmpJs.decode(inputBMPBuffer)
const image: Image = bmpDataToImage(bmp)
const filteredImage: Image = filter(args.filterName, image)
bmp.data = convertImageTo1DArray(filteredImage)
writeBuffer('output.bmp', bmpJs.encode(bmp).data)
