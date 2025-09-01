import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

import { TransactionsTable, TransactionsFilter } from '../components'
import { useStore } from '../context/StoreContext'

export const ExpensesTransactionsPage: React.FC = () => {
    const {
        expenseCategoryStore,
        expenseStore,
        expenseFilterStore,
        expenseListStore,
    } = useStore()

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
                        Total transactions: {expenseListStore.rows.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Total amount: {expenseListStore.amounts.totalAmount} (
                        {expenseListStore.amounts.totalRefAmount})
                    </Typography>
                </Stack>
                <TransactionsFilter />
                <TransactionsTable
                    rows={expenseListStore.rows}
                    handlers={{
                        onCommentChange: (expenseId, comment, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { comment }
                                  )
                                : expenseStore.updateExpenseField(expenseId, {
                                      comment,
                                  }),
                        onCategoryChange: (expenseId, category, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { category }
                                  )
                                : expenseStore.updateExpenseField(expenseId, {
                                      category,
                                  }),
                        onLabelChange: (expenseId, labels, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { labels }
                                  )
                                : expenseStore.updateExpenseField(expenseId, {
                                      labels,
                                  }),
                        onHideChange: (expenseId, hide, subExpenseId) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { hide }
                                  )
                                : expenseStore.updateExpenseField(expenseId, {
                                      hide,
                                  }),
                        onCapitalizeChange: (
                            expenseId,
                            capitalized,
                            subExpenseId
                        ) =>
                            subExpenseId
                                ? expenseStore.updateSubExpenseField(
                                      subExpenseId,
                                      { capitalized }
                                  )
                                : expenseStore.updateExpenseField(expenseId, {
                                      capitalized,
                                  }),
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
                        labels: expenseFilterStore.options.labels,
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
