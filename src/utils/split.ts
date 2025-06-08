export function split<T>(
    arr: T[],
    predicate: (item: T) => boolean
): [T[], T[]] {
    const trueGroup: T[] = []
    const falseGroup: T[] = []

    for (const item of arr) {
        const result = predicate(item)
        if (result) {
            trueGroup.push(item)
        } else {
            falseGroup.push(item)
        }
    }

    return [trueGroup, falseGroup]
}

export async function splitAsync<T>(
    arr: T[],
    predicate: (item: T) => Promise<boolean>
): Promise<[T[], T[]]> {
    const trueGroup: T[] = []
    const falseGroup: T[] = []

    for (const item of arr) {
        const result = await predicate(item)
        if (result) {
            trueGroup.push(item)
        } else {
            falseGroup.push(item)
        }
    }

    return [trueGroup, falseGroup]
}
