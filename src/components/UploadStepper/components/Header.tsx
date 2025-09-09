import React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

interface HeaderProps {
    activeStep: number
    steps: string[]
}

export const Header: React.FC<HeaderProps> = ({ activeStep, steps }) => (
    <Stepper activeStep={activeStep}>
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>
)
