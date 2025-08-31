import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

import { useFilterOptions, useExpenseTable } from '../hooks'
import { TransactionsTable, TransactionsFilter } from '../components'
import { useStore } from '../context/StoreContext'

export const ExpensesTransactionsPage: React.FC = () => {
    const { expenseCategoryStore, expenseStore } = useStore()

    // "totalAmount" won't work if transactions of different currencies are present
    // TODO: Count total by currency
    const { rows, totalAmount, totalRefAmount } = useExpenseTable(
        expenseStore.expenses,
        expenseStore.subExpenses
    )

    const filterOptions = useFilterOptions(
        expenseStore.expenses,
        expenseStore.subExpenses
    )

    const renderContent = () => {
        if (expenseStore.loading) {
            return <Typography>Loading transactions...</Typography>
        }

        if (expenseStore.error) {
            return (
                <Typography color="error">
                    Error: {expenseStore.error}
                </Typography>
            )
        }

        return (
            <Stack spacing={4}>
                <Stack direction="row" spacing={2}>
                    {/* TODO: Make this section collapsable */}
                    <Typography variant="body1" gutterBottom>
                        Total transactions: {rows.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Total amount: {totalAmount} ({totalRefAmount})
                    </Typography>
                </Stack>
                <TransactionsFilter options={filterOptions} />
                <TransactionsTable
                    rows={rows}
                    handlers={{
                        onCommentChange: (expenseId, comment, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { comment },
                                      'Failed to update comment'
                                  )
                                : expenseStore.updateExpenseField(
                                      expenseId,
                                      { comment },
                                      'Failed to update comment'
                                  ),
                        onCategoryChange: (expenseId, category, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { category },
                                      'Failed to update category'
                                  )
                                : expenseStore.updateExpenseField(
                                      expenseId,
                                      { category },
                                      'Failed to update category'
                                  ),
                        onLabelChange: (expenseId, labels, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { labels },
                                      'Failed to update labels'
                                  )
                                : expenseStore.updateExpenseField(
                                      expenseId,
                                      { labels },
                                      'Failed to update labels'
                                  ),
                        onHideChange: (expenseId, hide, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { hide },
                                      'Failed to update hide'
                                  )
                                : expenseStore.updateExpenseField(
                                      expenseId,
                                      { hide },
                                      'Failed to update hide'
                                  ),
                        onCapitalizeChange: (
                            expenseId,
                            capitalized,
                            subExpenseId
                        ) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { capitalized },
                                      'Failed to update capitalization'
                                  )
                                : expenseStore.updateExpenseField(
                                      expenseId,
                                      { capitalized },
                                      'Failed to update capitalization'
                                  ),
                        onDelete: (expenseId, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.delete(expenseId, subExpenseId)
                                : expenseStore.delete(expenseId),
                        onSubTransactionCreate: (expenseId, amount) =>
                            expenseStore.createSubTransaction(
                                expenseId,
                                amount
                            ),
                    }}
                    options={{
                        categories: expenseCategoryStore.categories,
                        labels: filterOptions.labels,
                    }}
                />
            </Stack>
        )
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Transactions
            </Typography>
            {renderContent()}
        </Box>
    )
}
