import {readFileSync} from "fs"
import { writeBuffer } from "../src/fileIO"

describe("should write a buffer", () => {

    it("should be able to write a given buffer", () => {
        const testBuffer: Buffer = Buffer.from("test", "utf-8")
        writeBuffer("./test/realOutput.txt", testBuffer)
        const realOutput: string = readFileSync("./test/realOutput.txt", "utf8")
        expect(realOutput).toStrictEqual("test")
    })
})
