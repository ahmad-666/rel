import { COOKIE_KEY } from '@auth/configs';
import { type User } from '@auth/types';

//? For fetch user jwt token from cookie ... can work on both server,client environments
const getToken = async () => {
    const isServer = typeof window === 'undefined';
    let token: undefined | string = undefined;
    let authCookie;
    try {
        if (isServer) {
            const {
                default: { cookies }
            } = await import('next/headers');
            const serverCookies = await cookies();
            authCookie = serverCookies.get(COOKIE_KEY)?.value;
        } else {
            const { default: Cookie } = await import('js-cookie');
            authCookie = Cookie.get(COOKIE_KEY);
        }
        const parsedCookie = JSON.parse(authCookie || '');
        token = (parsedCookie?.state?.user as User)?.token;
        return token;
    } catch (err) {
        return undefined;
    }
};

export default getToken;
