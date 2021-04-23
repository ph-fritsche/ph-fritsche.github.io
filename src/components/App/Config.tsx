import React, { useEffect, useMemo, useReducer, useRef } from 'react';

const key = 'appConfig'
const ConfigContext = React.createContext<ReturnType<typeof useConfigProvider> | undefined>(undefined)

function getFromStore(): ReturnType<typeof createConfig> {
    const stored = localStorage.getItem(key)
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
            localStorage.setItem(key, JSON.stringify(mergedConfig))
            return mergedConfig
        },
        getFromStore(),
    )

    const configRef = useRef({
        darkModeUsed: 0,
    })

    return useMemo(() => ({
        configReducer,
        configRef,
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

        ++ref.current.darkModeUsed

        if (ref.current.darkModeUsed === 1) {
            context.configReducer[1]({darkModeSwitch: true})
        }

        return () => {
            --ref.current.darkModeUsed

            if (ref.current.darkModeUsed === 0) {
                context.configReducer[1]({darkModeSwitch: false})
            }
        }
    }, [context.configRef, context.configReducer])
}
