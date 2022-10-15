import {readFileSync, unlinkSync} from "fs"
import { writeBuffer, readImageFile} from "../src/fileIO"

describe("writeBuffer", () => {
    it("should be able to write a given buffer", () => {
        const path: string = "./test/realOutput.txt"
        const testBuffer: Buffer = Buffer.from("test", "utf-8")
        writeBuffer(path, testBuffer)
        const realOutput: string = readFileSync(path, "utf8")
        unlinkSync(path)
        expect(realOutput).toStrictEqual("test")
    })
})

describe("readImageFile", () => { 
    it ("should read a given path", () => {
        const expectedOutput: Buffer = readFileSync("./test/images/input.bmp")
        const realOutput: Buffer = readImageFile("./test/images/input.bmp")
        expect(realOutput).toStrictEqual(expectedOutput)
    })
})
