import { readFileSync } from "fs"
import main from "../src/index"
const bmp = require('bmp-js')


const filterTypes: string[] = ["g", "gb", "e", "c"]
for (let i = 0; i < filterTypes.length; i++) {
    const expectedOutput: number[] = bmp.decode(readFileSync(`./images/${filterTypes[i]}.test.bmp`)).data
    const realOutput = main(["node", "index.js", `-${filterTypes[i]}`, "./test/"]).data

    if (expectedOutput.toString() === realOutput.toString()) {
        console.log(`${filterTypes[i]}: passed`)
    }
    else {
        console.log(`${filterTypes[i]}: failed`)
    }
}