import { Box, Theme, useTheme } from '@mui/material'
import React, { useRef, createContext, useEffect, useContext } from 'react'

type SwipeHandler = () => void
type SwipeHandlers = {
    up?: SwipeHandler,
    left?: SwipeHandler,
    right?: SwipeHandler,
    down?: SwipeHandler,
}
const swipeThreshold = 16
const swipeActionThreshold = 160
const swipeActionDelay = 200
const swipeMargin = 32

function createContextValue(): {
    up: SwipeHandler[],
    left: SwipeHandler[],
    right: SwipeHandler[],
    down: SwipeHandler[],
    }
{
    return {
        up: [],
        left: [],
        right: [],
        down: [],
    }
}

const SwipeableContext = createContext<ReturnType<typeof createContextValue>>(createContextValue())

export function useSwipeable(
    handlers: SwipeHandlers,
    deps?: unknown[],
) {
    const {up, left, right, down} = handlers
    const context = useContext(SwipeableContext)

    useEffect(() => {
        const h = {up, left, right, down}
        Object.entries(h).forEach(([k, handler]) => {
            const key = k as keyof typeof h
            handler && context[key].push(handler)
        })

        return () => {
            Object.entries(h).forEach(([k, handler]) => {
                const key = k as keyof typeof h
                context[key] = context[key].filter(h => h !== handler)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context, ...(deps ?? [up, left, right, down])])
}

export function Swipeable({
    position = 'fixed',
    children,
}: React.PropsWithChildren<{
    position?: 'fixed' | 'absolute',
}>) {
    const handlers = useRef(createContextValue()).current

    const container = useRef<HTMLDivElement>(null)
    const track = useRef<{
        touchDirection?: 'up' | 'down' | 'left' | 'right',
        touchStart?: {x: number, y: number},
        touchTargetRect?: DOMRect,
        touchTime?: number,
    }>({}).current

    function startTrack(e: React.TouchEvent<HTMLDivElement>) {
        track.touchStart = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
        track.touchTargetRect = e.currentTarget.getBoundingClientRect()
        track.touchTime = (new Date()).getTime()
    }

    function clearTrack() {
        if (track.touchDirection) {
            const marginEl = container.current?.querySelector(`[data-direction='${track.touchDirection}']`) as HTMLElement
            marginEl.style.margin = ''
        }
        delete track.touchDirection
        delete track.touchStart
        delete track.touchTargetRect
        delete track.touchTime
    }

    function evaluateTrack(e: React.TouchEvent<HTMLDivElement>) {
        if (!track.touchStart || !track.touchTargetRect || !track.touchTime) {
            return
        }

        const rect = e.currentTarget.getBoundingClientRect()
        if (rect.x !== track.touchTargetRect.x || rect.y !== track.touchTargetRect.y) {
            return clearTrack()
        }

        const x = e.touches[0].clientX - track.touchStart.x
        const y = e.touches[0].clientY - track.touchStart.y
        const dir = track.touchDirection ?? (
            Math.abs(x) > Math.abs(y)
                ? x > 0 ? 'right' : 'left'
                : y > 0 ? 'down' : 'up'
        )
        const abs = ['right', 'left'].includes(dir)
            ? Math.abs(x)
            : Math.abs(y)

        if (abs < swipeThreshold) {
            return
        } else if (!track.touchDirection) {
            track.touchDirection = dir
        } else if (dir !== track.touchDirection) {
            return
        }

        const handler = handlers[dir]
        if (!handler.length) {
            return
        }

        e.preventDefault()
        e.stopPropagation()

        const cushion = swipeActionThreshold * 1.2
        if (dir === 'left' && track.touchStart.x - rect.left < cushion
            || dir === 'right' && track.touchStart.x + cushion > rect.right
            || dir === 'up' && track.touchStart.y - rect.top < cushion
            || dir === 'down' && track.touchStart.y + cushion > rect.bottom
        ) {
            return
        }

        const marginEl = container.current?.querySelector(`[data-direction='${track.touchDirection}']`) as HTMLElement
        marginEl.style.margin = `0px`

        if (abs > swipeActionThreshold && (new Date()).getTime() > track.touchTime + swipeActionDelay) {
            handler.forEach(h => h())
            return clearTrack()
        }
    }

    const sx = makeSx(useTheme(), position)

    return (
        <Box
            ref={container}
            onTouchStart={startTrack}
            onTouchMove={evaluateTrack}
            onTouchEnd={clearTrack}
            onTouchCancel={clearTrack}
            sx={sx.container}
        >
            <Box sx={{...sx.margin, ...sx.vertical, ...sx.up}} data-direction="up"/>
            <Box sx={{...sx.margin, ...sx.vertical, ...sx.down}} data-direction="down"/>
            <Box sx={{...sx.margin, ...sx.horizontal, ...sx.left}} data-direction="left"/>
            <Box sx={{...sx.margin, ...sx.horizontal, ...sx.right}} data-direction="right"/>
            <Box>
                <SwipeableContext.Provider value={handlers}>
                    {children}
                </SwipeableContext.Provider>
            </Box>
        </Box>
    )
}

const makeSx = (theme: Theme, position: 'fixed' | 'absolute') => ({
    container: {
        position: 'relative',
        overflow: position === 'fixed' ? undefined : 'hidden',
    },
    margin: {
        position,
        transition: 'margin 200ms 0s ease-in',
        zIndex: 9999,
    },
    vertical: {
        width: '100%',
        height: swipeMargin,
    },
    horizontal: {
        width: swipeMargin,
        height: '100%',
    },
    down: {
        top: 0,
        marginTop: `-${swipeMargin}px`,
        backgroundImage: `radial-gradient(
            at 50% 0%,
            ${theme.palette.primary.light},
            transparent 70%
        )`,
    },
    right: {
        left: 0,
        marginLeft: `-${swipeMargin}px`,
        backgroundImage: `radial-gradient(
            at 0% 50%,
            ${theme.palette.primary.light},
            transparent 70%
        )`,
    },
    left: {
        right: 0,
        marginRight: `-${swipeMargin}px`,
        backgroundImage: `radial-gradient(
            at 100% 50%,
            ${theme.palette.primary.light},
            transparent 70%
        )`,
    },
    up: {
        bottom: 0,
        marginBottom: `-${swipeMargin}px`,
        backgroundImage: `radial-gradient(
            at 50% 100%,
            ${theme.palette.primary.light},
            transparent 70%
        )`,
    },
} as const)
