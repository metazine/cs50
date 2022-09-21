import { timeStamp } from "console"

const fs = require('fs')

//USER IO

const data: Buffer = fs.readFileSync('./input.bmp')

console.log(String.fromCharCode(data[0]) + String.fromCharCode(data[1]))

class BMPImage {
    buffer: Buffer
    position: number

    signature: string
    fileSize: number
    reserved: number
    dataOffset: number

    size: number
    width: number
    height: number
    planes: number
    bitsPerPixel: number
    compression: number
    imageSize: number
    XpixelsPerM: number
    YpixelsPerM: number
    colorsUsed: number
    importantColours: number

    constructor(image_file: Buffer) {
        this.buffer = image_file
        this.position = 0
        this.parseHeader()
    }

    parseHeader() {
        this.signature = this.buffer.toString("utf-8", this.position, this.position += 2)
        if (this.signature !== "BM") {
            throw new Error("Invalid signature")
        }

        this.fileSize = this.buffer.readInt32LE(this.position)
        this.reserved = this.buffer.readInt32LE(this.position += 4)
        this.dataOffset = this.buffer.readUint32LE(this.position += 4)
        this.size = this.buffer.readUint32LE(this.position += 4)
        this.width = this.buffer.readUint32LE(this.position += 4)
        this.height = this.buffer.readUint32LE(this.position += 4)
        this.planes = this.buffer.readUint16LE(this.position += 4)
        this.bitsPerPixel = this.buffer.readUint16LE(this.position += 2)
        this.compression = this.buffer.readUInt32LE(this.position += 2)
        this.imageSize = this.buffer.readUint32LE(this.position += 4)
        this.XpixelsPerM = this.buffer.readUint32LE(this.position += 4)
        this.YpixelsPerM = this.buffer.readUint32LE(this.position += 4)
        this.colorsUsed = this.buffer.readUint32LE(this.position += 4)
        this.importantColours = this.buffer.readUint32LE(this.position += 4)

        console.log(this.bitsPerPixel)
        console.log(this.imageSize)
        console.log(this.)
        console.log(this.colorsUsed)
        console.log(this.importantColours)
    }
}

const image = new BMPImage(data)