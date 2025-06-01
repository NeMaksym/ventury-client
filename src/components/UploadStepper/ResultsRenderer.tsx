import React, { useEffect } from 'react'

import { asyncPipe, CancellationError } from '../../utils/asyncPipe'
import { Bank, SourceTransaction } from '../../types'
import { useMessages } from '../../hooks/useMessages'

import {
    getDateToCurrencyMap,
    loadExchangeRates,
    toSystemTransactions,
    addToDB,
} from './pipeline'

interface ResultsRendererProps {
    bank: Bank
    sourceTransactions: SourceTransaction[]
}

const ERROR_KEYWORD = 'Error'

export const ResultsRenderer: React.FC<ResultsRendererProps> = ({
    bank,
    sourceTransactions,
}) => {
    const { messages, addMessage } = useMessages()

    useEffect(() => {
        const controller = new AbortController()

        asyncPipe(
            { sourceTransactions, addMessage, bank },
            getDateToCurrencyMap,
            loadExchangeRates,
            toSystemTransactions,
            addToDB,
            controller.signal
        )
            .then(() => addMessage('Success'))
            .catch((err) => {
                if (!(err instanceof CancellationError)) {
                    addMessage(`${ERROR_KEYWORD}: ${err.message}`)
                }
            })

        return () => controller.abort()
    }, [])

    return (
        <div
            style={{
                maxHeight: '400px',
                overflowY: 'auto',
            }}
        >
            {messages.map((message, index) => {
                const isError = message.includes(ERROR_KEYWORD)

                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px',
                            fontSize: '14px',
                        }}
                    >
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: isError
                                    ? '#dc3545'
                                    : '#28a745',
                            }}
                        ></div>
                        <span>{message}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default ResultsRenderer
