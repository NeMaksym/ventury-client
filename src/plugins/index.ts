import { Bank, BankPlugin } from '../types'

import { monoBankPlugin } from './monoBank'
import { privatBankPlugin } from './privatBank'
import { privatBankBusinessPlugin } from './privatBankBusiness'

export const plugins: Record<Bank, BankPlugin> = {
    monoBank: monoBankPlugin,
    privatBank: privatBankPlugin,
    privatBankBusiness: privatBankBusinessPlugin,
} as const
