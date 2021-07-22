import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet'

const App = React.lazy(() => import('./App'))

export default function AppWrapper({
    children,
}: React.PropsWithChildren<unknown>) {
    return <div key="App">
        <Helmet>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap"
                rel="stylesheet"
            />
        </Helmet>
        <Suspense fallback={null}>
            <App>
                {children}
            </App>
        </Suspense>
    </div>
}
