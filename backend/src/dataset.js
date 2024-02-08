import { readFile, readdir }  from 'fs/promises'
import { resolve, join } from 'path'

const base_dir = resolve("json")

/**
 * @param json_file_name {string}
 * @returns {Record<string,any>[]}
 * @example
 * ```ts
 * //Get json object from `${base_dir}/os.json`
 * await read_json("os")
 * ```
 */
export const read_json = async (json_file_name) => {
    return readFile(join( base_dir, json_file_name+".json"), 'utf8')
            .then(JSON.parse)
}

const filename = name => name.substring(0, name.lastIndexOf('.'))
/**
 * List all json files found
 */
export const ls_json = async ( ) => {
    return readdir(base_dir)
        .then(names => names.map(filename))
}
