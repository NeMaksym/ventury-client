import { useCallback, useState } from 'react'

export type AddMessage = (message: string) => void

export function useMessages() {
    const [messages, setMessages] = useState<string[]>([])

    const addMessage: AddMessage = useCallback(
        (message: string) => {
            setMessages((prev) => [...prev, message])
        },
        [setMessages]
    )

    return { messages, addMessage }
}
