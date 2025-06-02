// Free Currency Exchange Rates API
// https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file
class ExchangeRate {
    private BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@'

    private validateDate(date: string): void {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD (2024-03-06)

        if (!dateRegex.test(date)) {
            throw new Error('Invalid date format')
        }
    }

    async onDate(
        date: string,
        baseCurrency: string,
        targetCurrency: string
    ): Promise<number> {
        baseCurrency = baseCurrency.toLowerCase()
        targetCurrency = targetCurrency.toLowerCase()

        try {
            this.validateDate(date)

            const res = await fetch(
                `${this.BASE_URL}${date}/v1/currencies/${baseCurrency}.json`
            )

            const data = await res.json()

            return data[baseCurrency][targetCurrency]
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Failed to fetch exchange rate: ${err.message}`)
            }

            throw new Error('Failed to fetch exchange rate')
        }
    }
}

export const exchangeRate = new ExchangeRate()
