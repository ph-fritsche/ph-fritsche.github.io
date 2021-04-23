export function shuffle<T>(a: T[]) {
    const b = [...a]

    for (let i = b.length - 1; i > 0; i--) {
        const j = rand(0, i)
        const v = b[i]
        b[i] = b[j]
        b[j] = v
    }

    return b
}

export function rand(min: number, max: number) {
    min = Math.floor(min)
    max = Math.ceil(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function capitalize(str: string, g = true) {
    return str.replace(
        new RegExp(/\S+/, g ? 'g' : ''),
        (s: string) => s.substr(0, 1).toUpperCase() + s.substr(1)
    )
}
