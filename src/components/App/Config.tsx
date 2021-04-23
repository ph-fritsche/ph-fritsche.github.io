import React, { useEffect, useMemo, useReducer, useRef } from 'react';

const key = 'appConfig'
const ConfigContext = React.createContext<ReturnType<typeof useConfigProvider> | undefined>(undefined)

function getLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        return localStorage
    }
}

function getFromStore(): ReturnType<typeof createConfig> {
    const stored = getLocalStorage()?.getItem(key)
    return stored
        ? JSON.parse(stored)
        : createConfig()
}

function createConfig() {
    return {
        darkMode: false,
        darkModeSwitch: false,
    }
}

function useConfigProvider() {
    const configReducer = useReducer(
        (
            oldConfig: ReturnType<typeof createConfig>,
            newConfig: Partial<ReturnType<typeof createConfig>>,
        ) => {
            const mergedConfig = { ...oldConfig, ...newConfig }
            getLocalStorage()?.setItem(key, JSON.stringify(mergedConfig))
            return mergedConfig
        },
        getFromStore(),
    )

    const configRef = useRef({
        darkModeUsed: 0,
    })

    return useMemo(() => ({
        configReducer,
        configRef: configRef.current,
    }), [configReducer])
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

function useConfigContext() {
    const context = React.useContext(ConfigContext)

    if (!context) {
        throw new Error('Config can only be used inside a ConfigProvider')
    }

    return context
}

export function useConfig() {
    return useConfigContext().configReducer
}

export function useDarkModeSwitch() {
    const context = useConfigContext()

    useEffect(() => {
        const ref = context.configRef
        const [state, setState] = context.configReducer

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
    }, [context.configRef, context.configReducer])
}
