import { DateToCurrencyMapDTO } from './getDateToCurrencyMap'

const API_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@'

type ExchangeRateMap = {
    [date: string]: {
        [currencyCode: string]: number
    }
}

export interface LoadExchangeRatesDTO extends DateToCurrencyMapDTO {
    exchangeRatesMap: ExchangeRateMap
}

type LoadExchangeRates = (
    input: DateToCurrencyMapDTO
) => Promise<LoadExchangeRatesDTO>

export const loadExchangeRates: LoadExchangeRates = async (input) => {
    const { dateToCurrencyMap, addMessage } = input

    addMessage('Fetching exchange rates...')

    const promises = Object.entries(dateToCurrencyMap).flatMap(
        ([date, currencyCodes]) =>
            currencyCodes.map(async (currencyCode) => {
                const res = await fetch(
                    `${API_URL}${date}/v1/currencies/${currencyCode}.json`
                )

                const data = await res.json()

                const rate = { [currencyCode]: data[currencyCode].usd }

                return { date, rate }
            })
    )

    const exchangeRates = await Promise.all(promises)

    const exchangeRatesMap = exchangeRates.reduce<ExchangeRateMap>(
        (acc, curr) => ({
            ...acc,
            [curr.date]: {
                ...(acc[curr.date] ?? {}),
                ...curr.rate,
            },
        }),
        {}
    )

    return {
        ...input,
        exchangeRatesMap,
    }
}
