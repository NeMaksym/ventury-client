import { useEffect, useState } from 'react'
import { MonoAPIClientInfo } from '../types'

export function useAccountSelector(
    accounts: MonoAPIClientInfo['accounts'] | undefined
): [string, (id: string) => void] {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        if (accounts && accounts.length > 0) {
            const id = accounts[0]?.id
            id && setValue(id)
        }
    }, [accounts])

    return [value, setValue] as const
}
