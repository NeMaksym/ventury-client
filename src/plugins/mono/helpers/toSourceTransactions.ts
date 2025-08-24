import { MonoAPIClientInfo, MonoAPITransaction } from '../types'
import { SourceTransaction } from '../../../types'

export function toSourceTransactions(
    transactions: MonoAPITransaction[],
    account: MonoAPIClientInfo['accounts'][number]
): SourceTransaction[] {
    return transactions.map((transaction) => ({
        originalId: transaction.id,
        time: new Date(transaction.time * 1000),
        description: transaction.description,
        amount: transaction.amount,
        currencyCode: transaction.currencyCode,
        operationAmount: Math.abs(transaction.operationAmount),
        operationCurrencyCode: transaction.currencyCode,
        account: {
            type: 'iban',
            value: {
                iban: account.iban,
                maskedPan: account.maskedPan,
            },
        },
        commissionRate: transaction.commissionRate,
        mcc: transaction.mcc,
        hold: transaction.hold,
        ...(transaction.comment ? { comment: transaction.comment } : {}),
    }))
}
