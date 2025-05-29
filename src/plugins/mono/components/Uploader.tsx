import React from 'react'

export const Uploader: React.FC = () => {
    return (
        <div>
            <h3>Mono Bank Statement Upload</h3>
            <p>Upload your Mono bank statement file to import transactions.</p>
            <input
                type="file"
                accept=".json,.txt,.csv"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                        console.log('Selected file:', file.name)
                    }
                }}
            />
        </div>
    )
}
