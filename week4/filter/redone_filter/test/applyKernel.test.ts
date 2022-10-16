import applyKernel from "../src/applyKernel"
import { Image } from "../src/interfaces"

const inputImage: Image = [
    [{a:0, r:2, g:4, b:6 },{a:0, r:8, g:10, b:12 },{a:0, r:14, g:16, b:18 }],
    [{a:0, r:20, g:22, b:24 },{a:0, r:26, g:28, b:30 },{a:0, r:32, g:34, b:36 }],
    [{a:0, r:38, g:40, b:42 },{a:0, r:44, g:46, b:48 },{a:0, r:50, g:52, b:54 }]
]

const kernel: number[][] = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
]


describe("Apply kernel", () => {
    it("Applies a kernel to an image", () => {
        
    })
})