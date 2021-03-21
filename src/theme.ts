import { createMuiTheme } from "@material-ui/core";
import { colorPrimary } from "./config";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: colorPrimary,
        },
    },
})
