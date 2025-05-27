import React, { useState } from 'react'
import { Box } from '@mui/material'

import { Header } from './Header'
import { Footer } from './Footer'
import { BankSelector } from './BankSelector'
import { PrivateUploader } from '../PrivateUploader'
import { MonoUploader } from '../MonoUploader'
import { Bank } from '../../types'

interface UploadStepperProps {
    onComplete?: () => void
}

const STEPS = ['Select Bank', 'Upload Data']

const BANK_OPTIONS: { value: Bank; label: string }[] = [
    { value: 'mono', label: 'Mono' },
    { value: 'private', label: 'Private' },
]

const BANK_COMPONENTS_MAP: Record<Bank, React.ComponentType> = {
    mono: MonoUploader,
    private: PrivateUploader,
}

export const UploadStepper: React.FC<UploadStepperProps> = () => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

    const [bank, setBank] = useState<Bank>('private')

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
                const BankComponent = BANK_COMPONENTS_MAP[bank]
                return <BankComponent />
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
                onBack={handleBack}
                isBackDisabled={activeStep === 0}
                onNext={handleNext}
                isNextDisabled={activeStep === STEPS.length - 1}
            />
        </Box>
    )
}
