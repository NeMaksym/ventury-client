export function fromSmallestUnit(amount: number): number {
    return amount / 100
}

export function toSmallestUnit(val: number): number {
    return Math.round(val * 100)
}
