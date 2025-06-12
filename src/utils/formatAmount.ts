export function formatAmount(amount: bigint): string {
    return (Number(amount) / 100).toFixed(2)
}
