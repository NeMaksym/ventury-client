import { Bank, BankPlugin } from '../types'

import { monoPlugin } from './mono'
import { privatePlugin } from './private'

export const plugins: Record<Bank, BankPlugin> = {
    mono: monoPlugin,
    private: privatePlugin,
} as const
