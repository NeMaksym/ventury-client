export const SUPPORTED_BANKS = {
    MONO: 'mono',
    PRIVATE: 'private',
} as const

export type BankType = (typeof SUPPORTED_BANKS)[keyof typeof SUPPORTED_BANKS]
