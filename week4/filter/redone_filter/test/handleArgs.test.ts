import handleArgs from "../src/handleArgs"

describe("Handle Command Line Args",() => {
    it("should reject not 4 element long argv", () => {
        const testArgs = ["1", "2"]
        expect(() => {handleArgs(testArgs)}).toThrow(/Invalid Arg Count/)  
    })

    it ("should accept 4 element long argv", () => {
        const testArgs = ["1","2","3","4"]
        expect(handleArgs(testArgs)).toBeTruthy()
    })

    it("Returns the name of the filter", () => {
        const testArgs = ["node", "index.js", "filterName", "path"]
        const expectedOutput = {
            filterName: "filterName",
            path: "path"
        }
        expect(handleArgs(testArgs)).toMatchObject(expectedOutput)
    })
})