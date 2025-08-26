/**
 * Represents client information from the Mono API
 * @interface MonoAPIClientInfo
 * @property {string} clientId - Client identifier (matches id for send.monobank.ua) (e.g. "3MSaMMtczs")
 * @property {string} name - Client name (e.g. "Мазепа Іван")
 * @property {string} webHookUrl - URL for receiving account balance change events (e.g. "https://example.com/some_random_data_for_security")
 * @property {string} permissions - List of permissions granted by the service (1 letter per permission) (e.g. "psfj")
 * @property {MonoAPIAccount[]} accounts - List of available accounts
 */
export interface MonoAPIClientInfo {
    clientId: string
    name: string
    webHookUrl: string
    permissions: string
    accounts: MonoAPIAccount[]
}

/**
 * Represents a bank account from the Mono API
 * @interface MonoAPIAccount
 * @property {string} id - Account identifier (e.g. "kKGVoZuHWzqVoZuH")
 * @property {string} sendId - Identifier for send.monobank.ua/{sendId} service (e.g. "uHWzqVoZuH")
 * @property {number} balance - Account balance in minimal currency units (cents) (e.g. 10000000)
 * @property {number} creditLimit - Credit limit (e.g. 10000000)
 * @property {MonoAPIAccountType} type - Account type (e.g. "black")
 * @property {number} currencyCode - Currency code according to ISO 4217 (e.g. 980)
 * @property {MonoAPICashbackType} cashbackType - Type of cashback accrued to the account (e.g. "UAH")
 * @property {string[]} maskedPan - List of masked card numbers
 * @property {string} iban - Account IBAN (e.g. "UA733220010000026201234567890")
 */
interface MonoAPIAccount {
    id: string
    sendId: string
    balance: number
    creditLimit: number
    type: MonoAPIAccountType
    currencyCode: number
    cashbackType: MonoAPICashbackType
    maskedPan: string[]
    iban: string
}

type MonoAPIAccountType =
    | 'black'
    | 'white'
    | 'platinum'
    | 'iron'
    | 'fop'
    | 'yellow'
    | 'eAid'
type MonoAPICashbackType = 'None' | 'UAH' | 'Miles'

/**
 * Represents a financial transaction from the Mono API
 * @interface MonoAPITransaction
 * @property {string} id - Unique transaction ID (e.g. "ZuHWzqkKGVo=")
 * @property {number} time - Transaction timestamp in Unix seconds (e.g. 1554466347)
 * @property {string} description - Transaction description (e.g. "Покупка щастя")
 * @property {number} mcc - Merchant Category Code according to ISO 18245 (user modified) (e.g. 7997)
 * @property {number} originalMcc - Original Merchant Category Code according to ISO 18245 (e.g. 7997)
 * @property {boolean} hold - Transaction hold status
 * @property {number} amount - Amount in account currency (in minimal currency units) (e.g. -95000)
 * @property {number} operationAmount - Amount in transaction currency (in minimal currency units) (e.g. -95000)
 * @property {number} currencyCode - Operation currency code according to ISO 4217 (e.g. 980 for UAH). !Note: documentation has an error in description
 * @property {number} commissionRate - Commission amount in minimal currency units (e.g. 0)
 * @property {number} cashbackAmount - Cashback amount in minimal currency units (e.g. 19000)
 * @property {number} balance - Account balance in minimal currency units (e.g. 10050000)
 * @property {string} [comment] - User-provided transaction comment (e.g. "За каву")
 * @property {string} [receiptId] - Receipt number for check.gov.ua (e.g. "XXXX-XXXX-XXXX-XXXX")
 * @property {string} [invoiceId] - Private entrepreneur receipt number for incoming payments (e.g. "2103.в.27")
 * @property {string} [counterEdrpou] - Counterparty EDRPOU code (only for business accounts) (e.g. "3096889974")
 * @property {string} [counterIban] - Counterparty IBAN (only for business accounts) (e.g. "UA898999980000355639201001404")
 * @property {string} [counterName] - Counterparty name (e.g. "ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «ВОРОНА»")
 */
export interface MonoAPITransaction {
    id: string
    time: number
    description: string
    mcc: number
    originalMcc: number
    hold: boolean
    amount: number
    operationAmount: number
    currencyCode: number
    commissionRate: number
    cashbackAmount: number
    balance: number
    comment?: string
    receiptId?: string
    invoiceId?: string
    counterEdrpou?: string
    counterIban?: string
    counterName?: string
}
