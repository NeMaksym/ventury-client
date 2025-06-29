import {
    ExpenseService,
    IncomeService,
    TransactionService,
} from '../../../hooks'
import { ToSystemTransactionsDTO } from './toSystemTransactions'
import { split, splitAsync } from '../../../utils'
import { SystemTransaction } from '../../../types'

type AddToDB = (input: {
    expenseService: ExpenseService
    incomeService: IncomeService
    transactionService: TransactionService
}) => (input: ToSystemTransactionsDTO) => Promise<void>

export const addToDB: AddToDB =
    ({ expenseService, incomeService, transactionService }) =>
    async (input) => {
        const { systemTransactions, addMessage } = input

        const [expenses, incomes] = split<SystemTransaction>(
            systemTransactions,
            (transaction) => transaction.amount < 0
        )

        addMessage(
            `Adding transactions to database... Total: ${systemTransactions.length} (${expenses.length} expenses, ${incomes.length} incomes)`
        )

        const [expensesDuplicates, expensesToAdd] =
            await splitAsync<SystemTransaction>(expenses, async (transaction) =>
                expenseService.expenseExists(transaction)
            )

        const [incomesDuplicates, incomesToAdd] =
            await splitAsync<SystemTransaction>(incomes, async (transaction) =>
                incomeService.transactionExists(transaction)
            )

        if (expensesDuplicates.length || incomesDuplicates.length) {
            addMessage(
                `Found duplicates: ${expensesDuplicates.length} expenses, ${incomesDuplicates.length} incomes`
            )
        }

        await transactionService.addTransactions([
            ...expensesToAdd,
            ...incomesToAdd,
        ])

        addMessage(
            `Added ${expensesToAdd.length} expenses and ${incomesToAdd.length} incomes to database`
        )
    }
