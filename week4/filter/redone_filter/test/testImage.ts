import { ImageDataArray, Kernel } from "../src/types"

const inputImage: ImageDataArray= [
    [{a:0, r:2, g:4, b:6 },{a:0, r:8, g:10, b:12 },{a:0, r:14, g:16, b:18 }],
    [{a:0, r:20, g:22, b:24 },{a:0, r:26, g:28, b:30 },{a:0, r:32, g:34, b:36 }],
    [{a:0, r:38, g:40, b:42 },{a:0, r:44, g:46, b:48 },{a:0, r:50, g:52, b:54 }]
]

const testKernel: Kernel = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
]

const kernelExpectedOutput: ImageDataArray = [
    [{"a":0,"r":20,"g":22,"b":24},{"a":0,"r":21.5,"g":23.5,"b":25.5},{"a":0,"r":23,"g":25,"b":27}],
    [{"a":0,"r":24.5,"g":26.5,"b":28.5},{"a":0,"r":26,"g":28,"b":30},{"a":0,"r":27.5,"g":29.5,"b":31.5}],
    [{"a":0,"r":29,"g":31,"b":33},{"a":0,"r":30.5,"g":32.5,"b":34.5},{"a":0,"r":32,"g":34,"b":36}]
]

const greyScaleExpectedOutput: ImageDataArray = [
    [{a:0, r:4, g:4, b:4 },{a:0, r:10, g:10, b:10 },{a:0, r:16, g:16, b:16 }],
    [{a:0, r:22, g:22, b:22 },{a:0, r:28, g:28, b:28 },{a:0, r:34, g:34, b:34 }],
    [{a:0, r:40, g:40, b:40 },{a:0, r:46, g:46, b:46 },{a:0, r:52, g:52, b:52 }]
]

const gaussianBlurExpectedOutput: ImageDataArray = [
    [{"a":0,"r":20,"g":22,"b":24},{"a":0,"r":21.5,"g":23.5,"b":25.5},{"a":0,"r":23,"g":25,"b":27}],
    [{"a":0,"r":24.5,"g":26.5,"b":28.5},{"a":0,"r":26,"g":28,"b":30},{"a":0,"r":27.5,"g":29.5,"b":31.5}],
    [{"a":0,"r":29,"g":31,"b":33},{"a":0,"r":30.5,"g":32.5,"b":34.5},{"a":0,"r":32,"g":34,"b":36}]
]

const edgeDetectionExpectedOutput: ImageDataArray = [
    [{"a": 0, "b": 75.8946638440411, "g": 75.8946638440411, "r": 75.8946638440411}, {"a": 0, "b": 86.53323061113575, "g": 86.53323061113575, "r": 86.53323061113575}, {"a": 0, "b": 75.8946638440411, "g": 75.8946638440411, "r": 75.8946638440411}], 
    [{"a": 0, "b": 145.98630072715727, "g": 145.98630072715727, "r": 145.98630072715727}, {"a": 0, "b": 151.7893276880822, "g": 151.7893276880822, "r": 151.7893276880822}, {"a": 0, "b": 145.98630072715727, "g": 145.98630072715727, "r": 145.98630072715727}], 
    [{"a": 0, "b": 75.8946638440411, "g": 75.8946638440411, "r": 75.8946638440411}, {"a": 0, "b": 86.53323061113575, "g": 86.53323061113575, "r": 86.53323061113575}, {"a": 0, "b": 75.8946638440411, "g": 75.8946638440411, "r": 75.8946638440411}]
]

const coloringBookExpectedOutput: ImageDataArray = [
    [{"a": 0, "b": 0, "g": 0, "r": 0}, {"a": 0, "b": 0, "g": 0, "r": 0}, {"a": 0, "b": 0, "g": 0, "r": 0}], 
    [{"a": 0, "b": 0, "g": 0, "r": 0}, {"a": 0, "b": 0, "g": 0, "r": 0}, {"a": 0, "b": 0, "g": 0, "r": 0}], 
    [{"a": 0, "b": 0, "g": 0, "r": 0}, {"a": 0, "b": 0, "g": 0, "r": 0}, {"a": 0, "b": 0, "g": 0, "r": 0}]
]

const bmpFileImage: ImageDataArray = [
    [{"a": 255, "b": 155, "g": 175, "r": 210}, {"a": 255, "b": 156, "g": 176, "r": 211}, {"a": NaN, "b": 157, "g": NaN, "r": NaN}],
    [{"a": 255, "b": 166, "g": 185, "r": 218}, {"a": 255, "b": 162, "g": 181, "r": 214}, {"a": 255, "b": 157, "g": 177, "r": 212}], 
    [{"a": 255, "b": 168, "g": 185, "r": 218}, {"a": 255, "b": 170, "g": 187, "r": 220}, {"a": 255, "b": 171, "g": 188, "r": 221}]
]

const inputImageBmpData: number[] = [0,6,4,2,0,12,10,8,0,18,16,14,0,24,22,20,0,30,28,26,0,36,34,32,0,42,40,38,0,48,46,44,0,54,52,50]

const testImage = {
    input: inputImage,
    kernelExpectedOutput: kernelExpectedOutput,
    gaussianBlurExpectedOutput: gaussianBlurExpectedOutput,
    edgeDetectionExpectedOutput: edgeDetectionExpectedOutput,
    greyScaleExpectedOutput: greyScaleExpectedOutput,
    coloringBookExpectedOutput: coloringBookExpectedOutput,
    kernel: testKernel,
    bmpFileImage: bmpFileImage,
    inputImageBmpData: inputImageBmpData
}

export default testImage 