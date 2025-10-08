import { UserSettings } from '../types';

const getSettingsStorageKey = (username: string): string => `toeicAppUserSettings_${username}`;

const defaultSettings: UserSettings = {
    name: '',
    email: '',
    scoreTarget: '',
    examDate: '',
    darkMode: false,
};

export const getSettings = (username: string): UserSettings => {
    try {
        const storedSettings = localStorage.getItem(getSettingsStorageKey(username));
        if (storedSettings) {
            const parsed = JSON.parse(storedSettings);
            // Ensure all keys exist to prevent errors with older settings formats
            return { ...defaultSettings, ...parsed };
        }
        return { ...defaultSettings };
    } catch (error) {
        console.error("Error reading settings from localStorage", error);
        return { ...defaultSettings };
    }
};

export const saveSettings = (username: string, settings: UserSettings): void => {
    try {
        localStorage.setItem(getSettingsStorageKey(username), JSON.stringify(settings));
    } catch (error) {
        console.error("Error saving settings to localStorage", error);
    }
};
