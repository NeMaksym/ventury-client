import { BankPlugin } from '../../types'
import { Uploader } from './components/Uploader'

export const privatePlugin: BankPlugin = {
    country: 'ua',
    label: 'Private',
    Uploader,
}
