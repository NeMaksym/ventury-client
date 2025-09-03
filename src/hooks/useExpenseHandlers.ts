import { useMemo } from 'react'
import {
    TransactionActionHandler,
    TransactionDeleteHandler,
} from '../components/TransactionsTable/types'
import { useStore } from '../context/StoreContext'

export interface ExpenseHandlers {
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate: TransactionActionHandler<number>
}

export function useExpenseHandlers(): ExpenseHandlers {
    const { expenseStore } = useStore()

    return useMemo(
        () => ({
            onCommentChange: (expenseId, comment, subExpenseId) => {
                const payload = { comment }

                subExpenseId
                    ? expenseStore.updateSubExpenseField(subExpenseId, payload)
                    : expenseStore.updateExpenseField(expenseId, payload)
            },
            onCategoryChange: (expenseId, category, subExpenseId) => {
                const payload = { category }

                subExpenseId
                    ? expenseStore.updateSubExpenseField(subExpenseId, payload)
                    : expenseStore.updateExpenseField(expenseId, payload)
            },
            onLabelChange: (expenseId, labels, subExpenseId) => {
                const payload = { labels }

                subExpenseId
                    ? expenseStore.updateSubExpenseField(subExpenseId, payload)
                    : expenseStore.updateExpenseField(expenseId, payload)
            },
            onHideChange: (expenseId, hide, subExpenseId) => {
                const payload = { hide }

                subExpenseId
                    ? expenseStore.updateSubExpenseField(subExpenseId, payload)
                    : expenseStore.updateExpenseField(expenseId, payload)
            },
            onCapitalizeChange: (expenseId, capitalized, subExpenseId) => {
                const payload = { capitalized }

                subExpenseId
                    ? expenseStore.updateSubExpenseField(subExpenseId, payload)
                    : expenseStore.updateExpenseField(expenseId, payload)
            },
            onDelete: expenseStore.delete,
            onSubTransactionCreate: expenseStore.createSubTransaction,
        }),
        [
            expenseStore.updateExpenseField,
            expenseStore.updateSubExpenseField,
            expenseStore.delete,
            expenseStore.createSubTransaction,
        ]
    )
}
