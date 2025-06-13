import cc, { CurrencyCodeRecord } from 'currency-codes'
import getSymbolFromCurrency from 'currency-symbol-map'

class Currency {
    private getByAlphaCode(code: string): CurrencyCodeRecord {
        const record = cc.code(code)

        if (!record) {
            throw new Error(`Unknown currency code: ${code}`)
        }

        return record
    }

    private getByNumCode(code: number): CurrencyCodeRecord {
        const record = cc.number(code.toString())

        if (!record) {
            throw new Error(`Unknown currency code: ${code}`)
        }

        return record
    }

    alphaToNum(code: string): number {
        const record = this.getByAlphaCode(code)
        return Number(record.number)
    }

    numToAlpha(code: number): string {
        const record = this.getByNumCode(code)
        return record.code
    }

    get usd(): CurrencyCodeRecord {
        return this.getByAlphaCode('USD')
    }

    get usdNumCode(): number {
        return Number(this.usd.number)
    }

    getSymbolByNumCode(code: number): string | undefined {
        const alphaCode = this.numToAlpha(code)
        return getSymbolFromCurrency(alphaCode)
    }
}

export const currency = new Currency()
