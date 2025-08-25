import { Bank, BankPlugin } from '../types'

import { monoPlugin } from './mono'
import { privatBankPlugin } from './privatBank'
import { privatBankBusinessPlugin } from './privatBankBusiness'

export const plugins: Record<Bank, BankPlugin> = {
    mono: monoPlugin,
    privatBank: privatBankPlugin,
    privatBankBusiness: privatBankBusinessPlugin,
} as const
