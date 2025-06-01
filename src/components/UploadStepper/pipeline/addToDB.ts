import { ToSystemTransactionsDTO } from './toSystemTransactions'

type AddToDB = (input: ToSystemTransactionsDTO) => Promise<void>

export const addToDB: AddToDB = async (input) => {
    const { systemTransactions, addMessage } = input

    addMessage('Adding transactions to database...')

    console.log(systemTransactions)
}
