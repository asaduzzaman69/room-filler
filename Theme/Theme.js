import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: 'Poppins'
    },
    styles: {
        global: {
            // styles for the `body`
            body: {
                fontFamily: 'Poppins, sans-serif',
            },
            // styles for the `a`
            a: {
                _hover: {
                    textDecoration: 'underline',
                },
            },
        },
    },
    components: {
        Button: {
            // Styles for the base style
            baseStyle: {
                fontWeight: 500,
                textTransform: 'uppercase',
                borderRadius: 'base',
            },
            // Styles for the size variations
            sizes: {
                sm: {
                    fontSize: 'sm',
                    px: 5, // <-- px is short for paddingLeft and paddingRight
                    py: 3,
                }
            },
            // Styles for the visual style variations
            variants: {
                outline: {
                    borderRadius: '8px',
                    color: '#18A7B9',
                    border: ' 2px solid ',
                    textTransform: 'capitalize',
                    fontSize: '14px'
                },
                unique: {
                    borderRadius: '40px 5px',
                    background: '#18A7B9',
                    color: "whtie",
                    padding: '27px 61px'

                }
            },
            // The default `size` or `variant` values
            defaultProps: {},
        },

    },
})

export default theme;