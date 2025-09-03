import { fromSmallestUnit } from '../utils'
import { SystemTransaction, SystemSubTransaction } from '../types'

export interface ExpenseTableStats {
    totalAmount: number
    totalRefAmount: number
}

// TODO: Count total by currency
export function useExpenseTableStats(
    rows: (SystemTransaction | SystemSubTransaction)[]
) {
    return {
        totalAmount: fromSmallestUnit(
            rows.reduce((acc, row) => acc + row.amount, 0)
        ),
        totalRefAmount: fromSmallestUnit(
            rows.reduce((acc, row) => acc + row.referenceAmount, 0)
        ),
    }
}
