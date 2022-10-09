import {readFileSync, writeFileSync} from "fs"

export function writeBuffer(path: string, buffer: Buffer) {
    writeFileSync(path, buffer)
}

export function readImageFile(path: string) {
    return readFileSync(path)
}