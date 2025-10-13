'use client';

import { useMemo, type ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { createTheme, ThemeProvider, type Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import {type Palette,type TypographyVariants} from '@mui/material/styles'
// import GlobalStyles  from '@mui/material/GlobalStyles';
// import {purple} from '@mui/material/colors'; //purple[500]
import palette, { type Color as BaseColor, type Palette as BasePalette, type ColorProp } from '@/themes/mui/palette';
import typography, { type Typography as BaseTypography, type TypographyProp } from '@/themes/mui/typograhpy';

type Props = {
    children: ReactNode;
};

//? Just add this theme provider to any layout that we want to use mui in it
const Mui = ({ children }: Props) => {
    const theme = useMemo<Theme>(() => {
        return createTheme({
            //! we disable cssVariables because on build version we had problems with mui injected css variables
            // cssVariables: true, //generate css variables in :root(e.g --mui-spacing) ... we can access to via 'theme.vars' too
            direction: 'ltr',
            spacing: 4, //sx={{mt:10 --> calc(10 * var(--mui-spacing))}} --> 40px
            shape: {
                borderRadius: 4 //sx={{borderRadius:10 --> calc(10 * var(--mui-shape-borderRadius))}} --> 40px
            },
            palette: {
                mode: 'light',
                primary: palette.primary, //<Button color="primary" sx={{color:'neutral.light3'}} />
                neutral: palette.neutral,
                success: palette.success,
                info: palette.info,
                warning: palette.warning,
                error: palette.error,
                pastelPink: palette.pastelPink
            },
            typography: {
                htmlFontSize: 16,
                fontFamily: 'var(--font-manrope), Roboto, sans-serif',
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 500,
                fontWeightBold: 700,
                displayLg: typography.displayLg, //  <Typography variant='displayLg' /> , <Button sx={{typography: 'displayLg'}} />
                displayMd: typography.displayMd,
                displaySm: typography.displaySm,
                headlineLg: typography.headlineLg,
                headlineMd: typography.headlineMd,
                headlineSm: typography.headlineSm,
                titleLg: typography.titleLg,
                titleMd: typography.titleMd,
                labelLg: typography.labelLg,
                labelMd: typography.labelMd,
                labelSm: typography.labelSm,
                bodyLg: typography.bodyLg,
                bodyMd: typography.bodyMd,
                bodySm: typography.bodySm,
                button: typography.labelLg,
                overline: typography.bodyMd,
                caption: typography.bodySm
            },
            breakpoints: {
                values: {
                    mobile: 0, //sx={{ bgcolor:{mobile:'primary.main',tablet:'neutral.dark3'} }}
                    tablet: 500,
                    laptop: 800,
                    desktop: 1100,
                    desktopXl: 1400
                }
            },
            // zIndex:{},
            // shadows: {}
            // transitions: {
            //     duration:{standard: 300},
            //     easing:{easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'}
            // }
            components: {
                MuiStack: {
                    defaultProps: {
                        direction: 'row'
                    }
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            boxShadow: 'none'
                        }
                    }
                },
                MuiButton: {
                    defaultProps: {
                        disableElevation: true
                    }
                    //variants: [{props: { newVariant: 'new-variant' },style: {color: '#fff'}}] //declare module '@mui/material/Button' {interface ButtonPropsVariantOverrides {newVariant: true;}}
                },
                MuiToggleButton: {
                    styleOverrides: {
                        root: {
                            textTransform: 'initial'
                        }
                    }
                },
                MuiSkeleton: {
                    variants: [{ props: { variant: 'rounded' }, style: { borderRadius: '.75rem' } }]
                },
                MuiMenu: {
                    styleOverrides: {
                        root: {
                            zIndex: 4
                        }
                    }
                },
                MuiDialog: {
                    styleOverrides: {
                        root: {
                            zIndex: 4 //make sure snackbar has higher zIndex
                        }
                    }
                }
            }
        });
    }, []);

    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* <GlobalStyles
                        styles={(theme) => ({
                            h1: { color: theme.palette.primary.main }
                        })}
                /> */}
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export default Mui;

//* Add typescript support for mui theme,props,sx,...:
declare module '@mui/material/styles' {
    //? Extend Palette ---------------------
    //this will only add to mui palette types and not change current mui palette types,colors
    interface PaletteColor extends BaseColor {}
    interface SimplePaletteColorOptions extends BaseColor {}
    interface Palette extends BasePalette {}
    interface PaletteOptions extends BasePalette {}
    //? Extend Typography ------------------
    interface TypographyVariants extends BaseTypography {}
    interface TypographyVariantsOptions extends BaseTypography {}
    //? Extend Breakpoints -----------------
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
        desktopXl: true;
    }
}
//? Extend props of mui components: -------------------------
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides extends TypographyProp {}
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides extends ColorProp {} //<Button color='primary' sx={{ bgcolor: 'success.dark2' }}> />
    // interface ButtonPropsVariantOverrides {glass: true;} //<Button variant="glass"> />
}
declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides extends ColorProp {}
}
declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides extends ColorProp {}
}
declare module '@mui/material/CircularProgress' {
    interface CircularProgressPropsColorOverrides extends ColorProp {}
}
declare module '@mui/material/LinearProgress' {
    interface LinearProgressPropsColorOverrides extends ColorProp {}
}
