export function fromSmallestUnit(amount: number): number {
    return Number(amount) / 100
}

export function toSmallestUnit(val: number): number {
    return Math.round(val * 100)
}
