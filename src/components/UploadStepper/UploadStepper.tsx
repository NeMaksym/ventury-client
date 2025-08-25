import React, { useState } from 'react'
import { Box } from '@mui/material'

import { Header, Footer, BankSelector, ResultsRenderer } from './components'
import { Bank, SourceTransaction } from '../../types'
import { plugins } from '../../plugins'

interface UploadStepperProps {
    onComplete?: () => void
}

const STEPS = ['Select Bank', 'Provide Data', 'Results']

const BANK_OPTIONS: { value: string; label: string }[] = Object.entries(
    plugins
).map(([key, plugin]) => ({
    value: key,
    label: plugin.label,
}))

export const UploadStepper: React.FC<UploadStepperProps> = () => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

    const [bank, setBank] = useState<Bank>('privatBank')
    const [data, setData] = useState<SourceTransaction[] | null>(null)

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <BankSelector
                        value={bank}
                        onChange={(value) => setBank(value as Bank)}
                        options={BANK_OPTIONS}
                    />
                )
            case 1: {
                // TODO: Create layout page for uploader. Plugin should provide only the upload logic.
                // And layout should be responsible for shared elements (header, button, mb bank/country icons)
                const UploaderComponent = plugins[bank].Uploader
                return (
                    <UploaderComponent uploadData={(data) => setData(data)} />
                )
            }
            case 2: {
                return (
                    <ResultsRenderer
                        bank={bank}
                        sourceTransactions={data ?? []}
                    />
                )
            }
            default:
                throw new Error('Unknown step')
        }
    }

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Header activeStep={activeStep} steps={STEPS} />

            <Box sx={{ mt: 4, ml: 2 }}>{renderStepContent(activeStep)}</Box>

            <Footer
                onBack={() => {
                    setData(null)
                    handleBack()
                }}
                isBackDisabled={activeStep === 0}
                onNext={handleNext}
                isNextDisabled={
                    activeStep === STEPS.length - 1 ||
                    (activeStep === 1 && !data)
                }
            />
        </Box>
    )
}
