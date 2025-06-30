import { openDB, DBSchema, IDBPDatabase } from 'idb'

import { Category, SystemSubTransaction, SystemTransaction } from '../types'

const DB_NAME = 'ventury-db'
const DB_VERSION = 1

export const Stores = {
    EXPENSES: 'expenses',
    SUB_EXPENSES: 'sub-expenses',
    EXPENSE_CATEGORIES: 'expense-categories',
    INCOMES: 'incomes',
} as const

const DEFAULT_CATEGORIES: string[] = [
    '🎓 Education',
    '👥 Family & Friends',
    '🍽️ Food & Dining',
    '🏥 Health',
    '🍿 Leisure',
    '🏠 Living Place',
    '⚖️ Obligations',
    '📦 Other',
    '👤 Personal & Self-Care',
    '⚙️ Personal Efficiency',
    '🏆 Sports',
    '🚗 Transportation',
]

export interface VenturyDB extends DBSchema {
    [Stores.EXPENSES]: {
        key: string
        value: SystemTransaction
        indexes: {
            time: Date
            bank: string
            category: string
            labels: string
        }
    }
    [Stores.SUB_EXPENSES]: {
        key: string
        value: SystemSubTransaction
        indexes: {
            parentId: string
            time: Date
            bank: string
            category: string
            labels: string
        }
    }
    [Stores.EXPENSE_CATEGORIES]: {
        key: string
        value: Category
    }
    [Stores.INCOMES]: {
        key: string
        value: SystemTransaction
        indexes: {
            time: Date
            bank: string
            category: string
            labels: string
        }
    }
}

let db: IDBPDatabase<VenturyDB> | null = null

export async function getDb(): Promise<IDBPDatabase<VenturyDB>> {
    if (!db) {
        db = await openDB<VenturyDB>(DB_NAME, DB_VERSION, {
            upgrade(db, oldVersion) {
                if (oldVersion < 1) {
                    const expensesStore = db.createObjectStore(
                        Stores.EXPENSES,
                        { keyPath: 'id' }
                    )
                    expensesStore.createIndex('time', 'time')
                    expensesStore.createIndex('bank', 'bank')
                    expensesStore.createIndex('category', 'category')
                    expensesStore.createIndex('labels', 'labels', {
                        multiEntry: true,
                    })

                    const subExpensesStore = db.createObjectStore(
                        Stores.SUB_EXPENSES,
                        { keyPath: 'id' }
                    )
                    subExpensesStore.createIndex('parentId', 'parentId')
                    subExpensesStore.createIndex('time', 'time')
                    subExpensesStore.createIndex('bank', 'bank')
                    subExpensesStore.createIndex('category', 'category')
                    subExpensesStore.createIndex('labels', 'labels', {
                        multiEntry: true,
                    })

                    const expenseCategoriesStore = db.createObjectStore(
                        Stores.EXPENSE_CATEGORIES,
                        { keyPath: 'id' }
                    )
                    DEFAULT_CATEGORIES.forEach((label) => {
                        expenseCategoriesStore.add({
                            id: crypto.randomUUID(),
                            label,
                        })
                    })

                    const incomesStore = db.createObjectStore(Stores.INCOMES, {
                        keyPath: 'id',
                    })
                    incomesStore.createIndex('time', 'time')
                    incomesStore.createIndex('bank', 'bank')
                    incomesStore.createIndex('category', 'category')
                    incomesStore.createIndex('labels', 'labels', {
                        multiEntry: true,
                    })
                }
            },
            blocked() {
                console.warn('Database upgrade blocked by another connection')
            },
            blocking() {
                console.warn('Database upgrade is blocking another connection')
            },
        })
    }

    return db
}
