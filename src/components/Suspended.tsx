import React, { useEffect, useState } from "react";

export default function Suspended({children}: React.PropsWithChildren<{}>) {
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        setDisplay(true)
    }, [])

    if(!display) {
        return null
    }

    return <>{children}</>
}
