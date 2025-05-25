import React, { createContext, useContext } from 'react'

import { getDb } from '../db/connect'

interface DbContextType {
    getDb: typeof getDb
}

const DbContext = createContext<DbContextType | undefined>(undefined)

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <DbContext.Provider value={{ getDb }}>{children}</DbContext.Provider>

export function useDb() {
    const context = useContext(DbContext)
    if (!context) {
        throw new Error('useDb must be used within a DbProvider')
    }
    return context
}
