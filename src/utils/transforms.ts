export const transformURL = (val: string) => {
    try {
        const normalizeURL = /^http(s)?:\/\//.test(val) ? val : `https://${val.trim()}`;
        const url = new URL(normalizeURL);
        return url.href;
    } catch (err) {
        return '';
    }
};
