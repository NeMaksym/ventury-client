import React, { useState } from 'react'
import { Box } from '@mui/material'

import { Header } from './Header'
import { Footer } from './Footer'
import { BankSelector } from './BankSelector'

interface UploadStepperProps {
    onComplete?: () => void
}

const STEPS = ['Select Bank', 'Upload Data']

const BANK_OPTIONS = [
    { value: 'mono', label: 'Mono' },
    { value: 'private', label: 'Private' },
]

export const UploadStepper: React.FC<UploadStepperProps> = () => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

    const [bankType, setBankType] = useState<'mono' | 'private'>('mono')

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <BankSelector
                        value={bankType}
                        onChange={(value) => setBankType(value as any)}
                        options={BANK_OPTIONS}
                    />
                )
            case 1:
                return null
            default:
                throw new Error('Unknown step')
        }
    }

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            <Header activeStep={activeStep} steps={STEPS} />

            <Box sx={{ mt: 4, ml: 2 }}>{renderStepContent(activeStep)}</Box>

            <Footer
                onBack={handleBack}
                isBackDisabled={activeStep === 0}
                onNext={handleNext}
                isNextDisabled={activeStep === STEPS.length - 1}
            />
        </Box>
    )
}
