import { useState, useEffect } from 'react'

const STORAGE_KEY = 'mono-api-token'
const DEFAULT_VALUE = ''

type UseTokenInputReturn = [string, (value: string) => void]

export function useTokenInput(): UseTokenInputReturn {
    const [value, setValue] = useState<string>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            return stored !== null ? stored : DEFAULT_VALUE
        } catch (error) {
            console.error(
                `Failed to read from localStorage for key "${STORAGE_KEY}":`,
                error
            )
            return DEFAULT_VALUE
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, value)
        } catch (error) {
            console.error(
                `Failed to write to localStorage for key "${STORAGE_KEY}":`,
                error
            )
        }
    }, [value])

    return [value, setValue]
}
