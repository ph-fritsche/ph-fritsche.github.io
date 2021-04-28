import React, { useEffect, useMemo, useReducer, useRef } from 'react';

const key = 'appConfig'
const ConfigContext = React.createContext<ReturnType<typeof useConfigProvider> | undefined>(undefined)

function getLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        return localStorage
    }
}

function getFromStore(): ReturnType<typeof createSettings> {
    const stored = getLocalStorage()?.getItem(key)
    return stored
        ? JSON.parse(stored)
        : createSettings()
}

function createSettings() {
    return {
        darkMode: false,
    }
}

function createState() {
    return {
        darkModeSwitch: false,
    }
}

function createRef() {
    return {
        darkModeUsed: 0,
    }
}

function useConfigProvider() {
    const settings = useReducer(
        (
            oldConfig: ReturnType<typeof createSettings>,
            newConfig: Partial<ReturnType<typeof createSettings>>,
        ) => {
            const mergedConfig = { ...oldConfig, ...newConfig }
            getLocalStorage()?.setItem(key, JSON.stringify(mergedConfig))
            return mergedConfig
        },
        getFromStore(),
    )

    const state = useReducer(
        (
            oldConfig: ReturnType<typeof createState>,
            newConfig: Partial<ReturnType<typeof createState>>,
        ) => {
            return { ...oldConfig, ...newConfig }
        },
        createState(),
    )

    const ref = useRef(createRef())

    return useMemo(() => ({
        settings,
        state,
        ref: ref.current,
    }), [settings, state])
}

export function ConfigProvider({
    children,
}: React.PropsWithChildren<unknown>) {
    return (
        <ConfigContext.Provider value={useConfigProvider()}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    const context = React.useContext(ConfigContext)

    if (!context) {
        return {
            settings: [createSettings(), () => { return }] as const,
            state: [createState(), () => { return }] as const,
            ref: createRef(),
        }
    }

    return context
}

export function useDarkModeSwitch() {
    const {state: [state, setState], ref} = useConfig()

    useEffect(() => {
        ++ref.darkModeUsed

        if (ref.darkModeUsed >= 1 && state.darkModeSwitch === false) {
            setState({darkModeSwitch: true})
        }

        return () => {
            --ref.darkModeUsed

            setTimeout(() => {
                if (ref.darkModeUsed <= 0 && state.darkModeSwitch === true) {
                    setState({darkModeSwitch: false})
                }
            }, 10)
        }
    }, [state, setState, ref])
}
