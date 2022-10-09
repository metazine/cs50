import {readFileSync} from "fs"
import test from "node:test"
import assert from "assert"

import {writeBuffer, readImageFile} from "../src/fileIO"

test('Should handle input and output', () => {
    const testBuffer: Buffer = Buffer.from("test", "utf-8")
    writeBuffer("./realOutput.txt", testBuffer)
    assert.strictEqual(readFileSync("realOutput.txt", "utf-8"), "test")
})

test('Should read a file', () => {
    const expectedValue: Buffer = readFileSync("./images/input.bmp")
    const actualValue: Buffer = readImageFile("../test/images/input.bmp")
    assert.deepStrictEqual(actualValue, expectedValue)
})
