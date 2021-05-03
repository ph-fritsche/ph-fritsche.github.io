/* eslint-disable @typescript-eslint/no-empty-function */

export default class {
    readonly root: Element | null = null
    readonly rootMargin: string = ''
    readonly thresholds: ReadonlyArray<number> = []

    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords(): IntersectionObserverEntry[] { return [] }
    unobserve() {}
}
