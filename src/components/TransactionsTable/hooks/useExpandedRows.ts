import { useState } from 'react'

export const useExpandedRows = () => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

    const toggleRow = (transactionId: string) => {
        const newExpandedRows = new Set(expandedRows)
        if (newExpandedRows.has(transactionId)) {
            newExpandedRows.delete(transactionId)
        } else {
            newExpandedRows.add(transactionId)
        }
        setExpandedRows(newExpandedRows)
    }

    const isExpanded = (transactionId: string) => {
        return expandedRows.has(transactionId)
    }

    return {
        isExpanded,
        toggleRow,
    }
}
