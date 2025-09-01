import { SystemSubTransaction, SystemTransaction } from '../types'

export const timeDesc = (
    a: SystemTransaction | SystemSubTransaction,
    b: SystemTransaction | SystemSubTransaction
) => {
    return b.time - a.time
}
