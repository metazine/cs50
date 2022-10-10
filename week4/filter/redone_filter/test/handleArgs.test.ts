import assert from "node:assert"
import { describe, it } from "node:test"
import handleArgs from "../src/handleArgs"

describe("Handle Command Line Args",() => {
    it("should reject not 4 element long argv", () => {
        const testArgs = ["not", ""]
        assert.throws(() => {handleArgs(testArgs)}, /Invalid Arg Count/)
    })
    
})