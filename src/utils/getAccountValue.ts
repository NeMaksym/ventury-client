import { SystemTransaction } from '../types'

function getAccountValue(transaction: SystemTransaction): string {
    switch (transaction.account.type) {
        case 'maskedPan':
            return transaction.account.value
        case 'iban':
            return (
                transaction.account.value.maskedPan[0] ??
                transaction.account.value.iban
            )
    }
}

const DELIMITER = ':::'

export function getBankAccountValue(transaction: SystemTransaction): string {
    return `${transaction.bank}${DELIMITER}${getAccountValue(transaction)}`
}

export function fromBankAccountValue(bankAccountValue: string): {
    bank: string
    accountValue: string
} {
    const [bank, accountValue] = bankAccountValue.split(DELIMITER)

    if (!bank || !accountValue) {
        throw new Error('Invalid bank account value')
    }

    return { bank, accountValue }
}
