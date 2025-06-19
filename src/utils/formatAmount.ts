export function fromSmallestUnit(amount: bigint): number {
    return Number(amount) / 100
}

export function toSmallestUnit(val: number): bigint {
    return BigInt(Math.round(val * 100))
}
