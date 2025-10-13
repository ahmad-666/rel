export type FontSizeVariant = {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
};
export type Typography = {
    displayLg: FontSizeVariant;
    displayMd: FontSizeVariant;
    displaySm: FontSizeVariant;
    headlineLg: FontSizeVariant;
    headlineMd: FontSizeVariant;
    headlineSm: FontSizeVariant;
    titleLg: FontSizeVariant;
    titleMd: FontSizeVariant;
    labelLg: FontSizeVariant;
    labelMd: FontSizeVariant;
    labelSm: FontSizeVariant;
    bodyLg: FontSizeVariant;
    bodyMd: FontSizeVariant;
    bodySm: FontSizeVariant;
};
export type TypographyProp = {
    displayLg: true;
    displayMd: true;
    displaySm: true;
    headlineLg: true;
    headlineMd: true;
    headlineSm: true;
    titleLg: true;
    titleMd: true;
    labelLg: true;
    labelMd: true;
    labelSm: true;
    bodyLg: true;
    bodyMd: true;
    bodySm: true;
};

const typography: Typography = {
    displayLg: {
        fontSize: '4.75rem',
        fontWeight: '800',
        lineHeight: '5.75rem',
        letterSpacing: '.025rem'
    },
    displayMd: {
        fontSize: '3.5rem',
        fontWeight: '800',
        lineHeight: '4rem',
        letterSpacing: '.025rem'
    },
    displaySm: {
        fontSize: '3rem',
        fontWeight: '700',
        lineHeight: '3.5rem',
        letterSpacing: '.025rem'
    },
    headlineLg: {
        fontSize: '2rem',
        fontWeight: '700',
        lineHeight: '2.75rem',
        letterSpacing: '.025rem'
    },
    headlineMd: {
        fontSize: '1.75rem',
        fontWeight: '700',
        lineHeight: '2.25rem',
        letterSpacing: '.025rem'
    },
    headlineSm: {
        fontSize: '1.55rem',
        fontWeight: '700',
        lineHeight: '2rem',
        letterSpacing: '.025rem'
    },
    titleLg: {
        fontSize: '1.125rem',
        fontWeight: '600',
        lineHeight: '1.25rem',
        letterSpacing: '0'
    },
    titleMd: {
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.25rem',
        letterSpacing: '0'
    },
    labelLg: {
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1rem',
        letterSpacing: '0'
    },
    labelMd: {
        fontSize: '.875rem',
        fontWeight: '600',
        lineHeight: '1rem',
        letterSpacing: '0'
    },
    labelSm: {
        fontSize: '.75rem',
        fontWeight: '600',
        lineHeight: '1rem',
        letterSpacing: '0'
    },
    bodyLg: {
        fontSize: '1.25rem',
        fontWeight: '500',
        lineHeight: '2.25rem',
        letterSpacing: '0'
    },
    bodyMd: {
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.75rem',
        letterSpacing: '0'
    },
    bodySm: {
        fontSize: '.875rem',
        fontWeight: '500',
        lineHeight: '1.75rem',
        letterSpacing: '0'
    }
};

export default typography;
