import {readFileSync, unlinkSync} from "fs"
import { writeBuffer } from "../src/fileIO"

describe("should write a buffer", () => {
    it("should be able to write a given buffer", () => {
        const path: string = "./test/realOutput.txt"
        const testBuffer: Buffer = Buffer.from("test", "utf-8")
        writeBuffer(path, testBuffer)
        const realOutput: string = readFileSync(path, "utf8")
        unlinkSync(path)
        expect(realOutput).toStrictEqual("test")
    })
})
