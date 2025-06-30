import React, { createContext, useContext, ReactNode } from 'react'
import { TransactionsTableProps } from './TransactionsTable'

interface TransactionContextType {
    handlers: TransactionsTableProps['handlers']
    options: TransactionsTableProps['options']
}

const TransactionContext = createContext<TransactionContextType | null>(null)

interface TransactionProviderProps {
    handlers: TransactionsTableProps['handlers']
    options: TransactionsTableProps['options']
    children: ReactNode
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
    handlers,
    options,
    children,
}) => {
    return (
        <TransactionContext.Provider value={{ handlers, options }}>
            {children}
        </TransactionContext.Provider>
    )
}

export const useTransactionHandlers =
    (): TransactionContextType['handlers'] => {
        const context = useContext(TransactionContext)
        if (!context) {
            throw new Error(
                'useTransactionHandlers must be used within a TransactionProvider'
            )
        }
        return context.handlers
    }

export const useTransactionOptions = (): TransactionContextType['options'] => {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error(
            'useTransactionOptions must be used within a TransactionProvider'
        )
    }
    return context.options
}
