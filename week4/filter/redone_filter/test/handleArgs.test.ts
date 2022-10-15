import handleArgs from "../src/handleArgs"

describe("Handle Command Line Args",() => {
    it("should reject not 4 element long argv", () => {
        const testArgs = ["not", ""]
        expect(() => {handleArgs(testArgs)}).toThrow(/Invalid Arg Count/)  
    })
})