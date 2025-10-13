export type Color = {
    light5?: string;
    light4?: string;
    light3?: string;
    light2?: string;
    light1?: string;
    light: string;
    surfaceLight?: string;
    main: string;
    contrastText: string;
    surface?: string;
    surfaceDark?: string;
    dark: string;
    dark1?: string;
    dark2?: string;
    dark3?: string;
    dark4?: string;
    dark5?: string;
};
export type Palette = {
    primary: Color;
    neutral: Color;
    success: Color;
    info: Color;
    warning: Color;
    error: Color;
    pastelPink: Color;
};
export type ColorProp = {
    primary: true;
    neutral: true;
    success: true;
    info: true;
    warning: true;
    error: true;
    pastelPink: true;
};

const palette: Palette = {
    primary: {
        light5: '#fee9e5',
        light4: '#ffe9de',
        light3: '#fdb899',
        light2: '#fd9f73',
        light1: '#fd864c',
        light: '#fd864c',
        surfaceLight: '#ffe9de',
        main: '#fc6d26',
        contrastText: '#fff',
        surface: '#e0743f',
        surfaceDark: '#943513',
        dark: '#e25f20',
        dark1: '#e25f20',
        dark2: '#c8511c',
        dark3: '#b34d1b',
        dark4: '#943513',
        dark5: '#7a280f'
    },
    neutral: {
        light5: '#f8f8f8',
        light4: '#f3f3f3',
        light3: '#e8e8e8',
        light2: '#cccccc',
        light1: '#adadad',
        light: '#adadad',
        main: '#828282',
        contrastText: '#fff',
        dark: '#646464',
        dark1: '#646464',
        dark2: '#454545',
        dark3: '#2f2f2f',
        dark4: '#0c0c0c',
        dark5: '#0c0c0c'
    },
    success: {
        light5: '#EBFFE7',
        light4: '#BFEDCD',
        light3: '#A1E4B5',
        light2: '#76D793',
        light1: '#5BD07E',
        light: '#76D793',
        main: '#32C45E',
        contrastText: '#FFF',
        dark: '#B1F2B5',
        dark1: '#C6FFC8',
        dark2: '#B1F2B5',
        dark3: '#1C6C34',
        dark4: '#003914',
        dark5: '#003914'
    },
    info: {
        light5: '#D7F6FF',
        light4: '#C0EAF2',
        light3: '#A1DFEC',
        light2: '#76D1E3',
        light1: '#5CC8DD',
        light: '#76D1E3',
        main: '#33BAD5',
        contrastText: '#FFF',
        dark: '#248497',
        dark1: '#2EA9C2',
        dark2: '#248497',
        dark3: '#1C6675',
        dark4: '#003640',
        dark5: '#003640'
    },
    warning: {
        light5: '#FFEFD3',
        light4: '#F8E7B2',
        light3: '#F5DC8D',
        light2: '#F1CC5A',
        light1: '#EEC239',
        light: '#F1CC5A',
        main: '#EAB308',
        contrastText: '#FFF',
        dark: '#A67F06',
        dark1: '#D5A307',
        dark2: '#A67F06',
        dark3: '#816204',
        dark4: '#3F2E00',
        dark5: '#3F2E00'
    },
    error: {
        light5: '#FDEAEB',
        light4: '#FABFC1',
        light3: '#F7A0A3',
        light2: '#F4747A',
        light1: '#F15960',
        light: '#F4747A',
        main: '#EE3038',
        contrastText: '#FFF',
        dark: '#A92228',
        dark1: '#D92C33',
        dark2: '#A92228',
        dark3: '#831A1F',
        dark4: '#68000B',
        dark5: '#68000B'
    },
    pastelPink: {
        light5: '#FFE7F5',
        light4: '#FFCFEC',
        light3: '#FFC2E7',
        light2: '#FFA7DB',
        light1: '#FF95D5',
        light: '#FFA7DB',
        main: '#FF7BCA',
        contrastText: '#FFF',
        dark: '#B5578F',
        dark1: '#E870B8',
        dark2: '#B5578F',
        dark3: '#8C446F',
        dark4: '#AA0A6A',
        dark5: '#AA0A6A'
    }
};

export default palette;
