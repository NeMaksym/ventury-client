import { openDB, DBSchema, IDBPDatabase } from 'idb'

import { SystemTransaction } from '../types'

const DB_NAME = 'ventury-db'
const DB_VERSION = 2

export const Stores = {
    EXPENSES: 'expenses',
    INCOMES: 'incomes',
} as const

export interface VenturyDB extends DBSchema {
    [Stores.EXPENSES]: {
        key: string
        value: SystemTransaction
        indexes: {
            bank: string
            time: string
            category: string
            labels: string
        }
    }
    [Stores.INCOMES]: {
        key: string
        value: SystemTransaction
        indexes: {
            bank: string
            time: string
            category: string
            labels: string
        }
    }
}

let db: IDBPDatabase<VenturyDB> | null = null

export async function getDb(): Promise<IDBPDatabase<VenturyDB>> {
    if (!db) {
        db = await openDB<VenturyDB>(DB_NAME, DB_VERSION, {
            upgrade(db, oldVersion, newVersion, transaction) {
                if (oldVersion < 1) {
                    const expensesStore = db.createObjectStore(
                        Stores.EXPENSES,
                        { keyPath: 'id' }
                    )

                    expensesStore.createIndex('bank', 'bank')
                    expensesStore.createIndex('category', 'category')
                    expensesStore.createIndex('labels', 'labels', {
                        multiEntry: true,
                    })
                }

                if (oldVersion < 2) {
                    const expensesStore = transaction.objectStore(
                        Stores.EXPENSES
                    )
                    expensesStore.createIndex('time', 'time')

                    const incomesStore = db.createObjectStore(Stores.INCOMES, {
                        keyPath: 'id',
                    })
                    incomesStore.createIndex('bank', 'bank')
                    incomesStore.createIndex('time', 'time')
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
