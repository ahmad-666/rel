export const numberFormatter = (
    value: number,
    { locale, ...rest }: { locale?: string } & Intl.NumberFormatOptions = { locale: 'en-US' }
) => {
    const intl = new Intl.NumberFormat(locale, { ...rest });
    return intl.format(value);
};
