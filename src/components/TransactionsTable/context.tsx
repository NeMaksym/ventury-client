import React, { createContext, useContext, ReactNode } from 'react'
import { TransactionsTableProps } from './TransactionsTable'

const TransactionHandlersContext = createContext<
    TransactionsTableProps['handlers'] | null
>(null)

interface TransactionHandlersProviderProps {
    handlers: TransactionsTableProps['handlers']
    children: ReactNode
}

export const TransactionHandlersProvider: React.FC<
    TransactionHandlersProviderProps
> = ({ handlers, children }) => {
    return (
        <TransactionHandlersContext.Provider value={handlers}>
            {children}
        </TransactionHandlersContext.Provider>
    )
}

export const useTransactionHandlers =
    (): TransactionsTableProps['handlers'] => {
        const context = useContext(TransactionHandlersContext)
        if (!context) {
            throw new Error(
                'useTransactionHandlers must be used within a TransactionHandlersProvider'
            )
        }
        return context
    }
