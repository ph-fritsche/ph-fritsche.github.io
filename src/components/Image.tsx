import React, { ComponentProps } from 'react'

export default function Image({
    src,
    ...others
}: ComponentProps<'img'> & {
    src: string
}) {
    return <img {...getImageProps(src)} alt="" {...others}/>
}

export function getImageProps(url: string) {
    const srcset = getImageSrcSet(url)
    return {
        src: Object.values(srcset)[0],
        srcSet: Object.entries(srcset)
            .map(([w, url]) => w && `${url} ${w}w`)
            .filter(Boolean).join(', ')
            || undefined,
    }
}

const match = {
    unsplash: (s: string) => s.match(/(?:^|\/\/)unsplash\.com\/photos\/(?<id>[\w-]+)(?:\/|$)/)?.groups,
}

function getImageSrcSet(url: string) {
    const widths = [960, 600, 400]

    const unsplash = match.unsplash(url)
    if (unsplash) {
        return Object.fromEntries(widths.map(w =>
            [w, `https://source.unsplash.com/${unsplash.id}/${w}x${w/2}`],
        ))
    }

    return {
        '': url,
    }
}

export function getImageOg(url: string) {
    const unsplash = match.unsplash(url)
    if (unsplash) {
        return `https://source.unsplash.com/${unsplash.id}/1200x630`
    }

    return url
}
