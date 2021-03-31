import React, { useReducer } from "react";

const key = 'appSettings'
const defaultSettings = {
    nightmode: false,
}

const SettingsContext = React.createContext<ReturnType<typeof useSettingsReducer>>([defaultSettings, () => {}])

function getFromStore(): typeof defaultSettings {
    const stored = localStorage.getItem(key)
    return stored
        ? JSON.parse(stored)
        : defaultSettings
}

export function useSettingsReducer() {
    return useReducer((
        oldSettings: typeof defaultSettings,
        newSettings: Partial<typeof defaultSettings>
    ) => {
        const mergedSettings = {...oldSettings, ...newSettings}
        localStorage.setItem(key, JSON.stringify(mergedSettings))
        return mergedSettings
    }, getFromStore())
}

export function SettingsProvider({
    settingsReducer,
    children
}: React.PropsWithChildren<{
    settingsReducer: ReturnType<typeof useSettingsReducer>
}>) {
    return (
        <SettingsContext.Provider value={settingsReducer}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return React.useContext(SettingsContext)
}
