import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'

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
