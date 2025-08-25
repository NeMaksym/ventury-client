import { Bank, BankPlugin } from '../types'

import { monoPlugin } from './mono'
import { privatBankPlugin } from './privatBank'

export const plugins: Record<Bank, BankPlugin> = {
    mono: monoPlugin,
    privatBank: privatBankPlugin,
} as const
