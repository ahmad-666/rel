export const PASSWORD_LENGTH = 8;
export const COOKIE_KEY = 'auth';
export const COOKIE_OPTIONS = {
    secure: true,
    path: '/',
    sameSite: 'lax' as 'none' | 'strict' | 'lax',
    expires: 365 //365 days
};
