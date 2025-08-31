import React, { createContext, useContext, useMemo } from 'react'
import { RootStore } from '../stores/rootStore'

const StoreContext = createContext<RootStore | undefined>(undefined)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const store = useMemo(() => new RootStore(), [])

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

export function useStore(): RootStore {
    const ctx = useContext(StoreContext)
    if (!ctx) {
        throw new Error('useStore must be used within a StoreProvider')
    }
    return ctx
}
