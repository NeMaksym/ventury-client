import React, { useState } from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { CloudUpload } from '@mui/icons-material'

import { UploaderProps } from '../../../types'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

const getSelectedFile = (event: React.ChangeEvent<HTMLInputElement>): File => {
    const selectedFile = event.target.files ? event.target.files[0] : null

    if (!selectedFile) {
        throw new Error('No file selected')
    }

    return selectedFile
}

export const Uploader: React.FC<UploaderProps> = ({ uploadData }) => {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)

        try {
            const selectedFile = getSelectedFile(event)

            setFile(selectedFile)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'An error occurred while processing the file'
            )
        }
    }

    return (
        <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Private Bank Statement Uploader
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
                Upload your Private Bank statement file here.
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    sx={{ mb: 2 }}
                >
                    Choose Excel File
                    <VisuallyHiddenInput
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                    />
                </Button>

                {file && (
                    <Typography variant="body2" color="text.secondary">
                        Selected: {file.name}
                    </Typography>
                )}

                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
