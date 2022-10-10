type AllowedTypes = number | Array<AllowedTypes>

export function flatten(elements: Array<AllowedTypes>): Array<number> {
    let flattedArray: Array<number> = []
    elements.forEach(element => {
        if (typeof element === 'number') {
            flattedArray.push(element)
        } else {
            flattedArray = flattedArray.concat(flatten(element))
        }
    })
    return flattedArray
}