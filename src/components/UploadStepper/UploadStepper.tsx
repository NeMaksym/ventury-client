import React, { useState } from 'react'
import { Box, Button, Paper, Step, StepLabel, Stepper } from '@mui/material'

import { StepOne } from './StepOne'
import { StepThree } from './StepThree'

const STEPS = ['Choose Bank', 'Provide Data', 'Results']

export const UploadStepper: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0)
    const handleBack = () => setActiveStep((prev) => prev - 1)
    const handleNext = () => setActiveStep((prev) => prev + 1)

    const [bank, setBank] = useState<'mono' | 'private'>('private')

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return <StepOne value={bank} onChange={setBank} />
            case 1:
                return 'Hello world'
            case 2:
                return <StepThree />
            default:
                throw new Error('Unknown step')
        }
    }

    return (
        <Box sx={{ p: 3 }}>
            <StepperHeader activeStep={activeStep} steps={STEPS} />
            <Paper sx={{ p: 3 }}>
                <Box sx={{ maxWidth: 600 }}>{renderStepContent()}</Box>
                <StepperFooter
                    onBack={handleBack}
                    isBackDisabled={activeStep === 0}
                    onNext={handleNext}
                    isNextDisabled={activeStep === 3}
                />
            </Paper>
        </Box>
    )
}

interface StepperHeaderProps {
    activeStep: number
    steps: readonly string[]
}

const StepperHeader: React.FC<StepperHeaderProps> = ({ activeStep, steps }) => (
    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>
)

interface StepperFooterProps {
    onBack: () => void
    isBackDisabled: boolean
    onNext: () => void
    isNextDisabled: boolean
}

const StepperFooter: React.FC<StepperFooterProps> = ({
    onBack,
    isBackDisabled,
    onNext,
    isNextDisabled,
}) => {
    const sx = {
        display: 'flex',
        mt: 2,
        borderTop: 1,
        borderColor: 'divider',
        pt: 2,
        '& > :first-of-type': { mr: 'auto' },
    }

    return (
        <Box sx={sx}>
            <Button onClick={onBack} disabled={isBackDisabled}>
                Back
            </Button>
            <Button
                variant="contained"
                onClick={onNext}
                disabled={isNextDisabled}
            >
                Next
            </Button>
        </Box>
    )
}
