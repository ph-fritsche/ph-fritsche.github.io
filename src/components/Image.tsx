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

function getImageSrcSet(url: string) {
    const widths = [960, 600, 400]

    const unsplash = url.match(/(?:^|\/\/)unsplash\.com\/photos\/(?<id>[\w\-]+)(?:\/|$)/)
    if (unsplash) {
        return Object.fromEntries(widths.map(w =>
            [w, `https://source.unsplash.com/${unsplash.groups?.id}/${w}x${w/2}`]
        ))
    }

    return {
        '': url,
    }
}
