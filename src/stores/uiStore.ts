import { makeAutoObservable, reaction } from 'mobx'
import { PaletteMode } from '@mui/material'

const THEME_STORAGE_KEY = 'ventury-theme-mode'

const getInitialTheme = (): PaletteMode => {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme
        }
    } catch (error) {
        console.warn('Failed to load theme from localStorage:', error)
    }

    return 'light'
}

export class UiStore {
    mode: PaletteMode

    constructor() {
        makeAutoObservable(this)
        this.mode = getInitialTheme()

        reaction(
            () => this.mode,
            (newMode) => {
                try {
                    localStorage.setItem(THEME_STORAGE_KEY, newMode)
                } catch (error) {
                    console.warn('Failed to save theme to localStorage:', error)
                }
            }
        )
    }

    toggleMode() {
        this.mode = this.mode === 'light' ? 'dark' : 'light'
    }
}
