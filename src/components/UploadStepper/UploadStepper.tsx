import React, { useState } from 'react'
import { Box } from '@mui/material'

import { Header } from './Header'
import { Footer } from './Footer'
import { BankSelector } from './BankSelector'
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

    const [bank, setBank] = useState<Bank>('private')
    const [uploadData, setUploadData] = useState<SourceTransaction[] | null>(
        null
    )

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
                const UploaderComponent = plugins[bank].Uploader
                return (
                    <UploaderComponent
                        uploadData={(data) => setUploadData(data)}
                    />
                )
            }
            case 2: {
                return <p>Results: {uploadData?.length}</p>
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
                    setUploadData(null)
                    handleBack()
                }}
                isBackDisabled={activeStep === 0}
                onNext={handleNext}
                isNextDisabled={
                    activeStep === STEPS.length - 1 ||
                    (activeStep === 1 && !uploadData)
                }
            />
        </Box>
    )
}
