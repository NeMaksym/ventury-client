import React, { createContext, useContext, ReactNode } from 'react'
import { TransactionActionHandler, TransactionDeleteHandler } from './types'

export interface TransactionHandlers {
    onCommentChange: TransactionActionHandler<string>
    onCategoryChange: TransactionActionHandler<string>
    onLabelChange: TransactionActionHandler<string[]>
    onHideChange: TransactionActionHandler<boolean>
    onCapitalizeChange: TransactionActionHandler<boolean>
    onDelete: TransactionDeleteHandler
    onSubTransactionCreate: TransactionActionHandler<number>
}

const TransactionHandlersContext = createContext<TransactionHandlers | null>(
    null
)

interface TransactionHandlersProviderProps {
    handlers: TransactionHandlers
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

export const useTransactionHandlers = (): TransactionHandlers => {
    const context = useContext(TransactionHandlersContext)
    if (!context) {
        throw new Error(
            'useTransactionHandlers must be used within a TransactionHandlersProvider'
        )
    }
    return context
}
