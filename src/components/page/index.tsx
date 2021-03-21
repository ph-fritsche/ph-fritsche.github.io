import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { theme } from "../../theme";
import Seo from "../Seo";
import { Page } from "./Page";

export function makePage<
    Component extends React.ElementType
>(
    Component: Component,
    {
        SeoProps
    }: {
        SeoProps?: React.ComponentProps<typeof Seo>,
    } = {}
): React.ElementType {
    return (props: React.ComponentProps<Component>) => {
        return (<ThemeProvider theme={theme}>

            <Seo {...SeoProps}/>

            <CssBaseline/>
            <Page>
                <Component {...props}/>
            </Page>

        </ThemeProvider>)
    }
}
