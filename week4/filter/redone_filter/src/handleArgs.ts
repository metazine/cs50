import { ArgvDescriptor } from "./interfaces"

export default function processArgs(argv: string[]): ArgvDescriptor {
    if (argv.length !== 4) {
        throw new Error("Invalid Arg Count")
    }
    const filterName: string | undefined = argv[2]
    const path: string | undefined = argv[3]

    if (!filterName) {
        throw new Error("Filter name hasn't been given")
    }
    if (!path) {
        throw new Error("Path hasn't been given")
    } 
    
    const argvSpecs: ArgvDescriptor = {
        filterName: filterName,
        path: path
    }
    return argvSpecs

}