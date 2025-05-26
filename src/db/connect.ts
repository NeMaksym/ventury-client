import { openDB, DBSchema, IDBPDatabase } from 'idb'

import { Transaction } from '../types/transaction'

const DB_NAME = 'ventury-db'
const DB_VERSION = 1

export const Stores = {
    EXPENSES: 'expenses',
} as const

export interface VenturyDB extends DBSchema {
    [Stores.EXPENSES]: {
        key: string
        value: Transaction
        indexes: {
            originalId: string
            bank: string
            category: string
            labels: string
        }
    }
}

let db: IDBPDatabase<VenturyDB> | null = null

export async function getDb() {
    if (!db) {
        db = await openDB<VenturyDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(Stores.EXPENSES)) {
                    const store = db.createObjectStore(Stores.EXPENSES, {
                        keyPath: 'id',
                    })

                    store.createIndex('originalId', 'originalId', {
                        unique: false,
                    })
                    store.createIndex('bank', 'bank', { unique: false })
                    store.createIndex('category', 'category', { unique: false })
                    store.createIndex('labels', 'labels', {
                        unique: false,
                        multiEntry: true,
                    })
                }
            },
        })
    }
    return db
}
