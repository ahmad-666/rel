'use server';

import { cookies } from 'next/headers';
import { COOKIE_KEY } from '@auth/configs';

//! Can only be used on server components ... for client side check we can use isLoggedIn getter of zustand store
const checkUserAuth = async () => {
    const serverCookies = await cookies();
    const authCookie = serverCookies.get(COOKIE_KEY)?.value;
    try {
        const parsedAuthCookie = JSON.parse(authCookie || '');
        const token = parsedAuthCookie.state.user.token;
        return !!token;
    } catch (err) {
        return false;
    }
};

export default checkUserAuth;
