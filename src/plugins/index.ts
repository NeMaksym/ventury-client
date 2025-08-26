import { Bank, BankPlugin } from '../types'

import { monobankPlugin } from './monobank'
import { privatBankPlugin } from './privatBank'
import { privatBankBusinessPlugin } from './privatBankBusiness'

export const plugins: Record<Bank, BankPlugin> = {
    Monobank: monobankPlugin,
    PrivatBank: privatBankPlugin,
    PrivatBankBusiness: privatBankBusinessPlugin,
} as const
