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
    }
}

let db: IDBPDatabase<VenturyDB> | null = null

export async function getDb() {
    if (!db) {
        db = await openDB<VenturyDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(Stores.EXPENSES)) {
                    db.createObjectStore(Stores.EXPENSES, { keyPath: 'id' })
                }
            },
        })
    }
    return db
}
