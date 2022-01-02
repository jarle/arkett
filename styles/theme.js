import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
        heading: 'nunito',
        body: 'nunito'
    },
    styles: {
        global: {
            body: {
                background: 'linear-gradient(0deg, rgba(238,174,202,0.555540191740413) 0%, rgba(148,187,233,0.5909384218289085) 100%)'
            }
        }
    }
});