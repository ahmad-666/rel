import { type ReactNode } from 'react';
import { GoogleOAuthProvider as GoogleOAuth } from '@react-oauth/google';
import envs from '@/configs/env';

type Props = {
    children: ReactNode;
};

const GoogleOAuthProvider = ({ children }: Props) => {
    return <GoogleOAuth clientId={envs.googleClientId}>{children}</GoogleOAuth>;
};

export default GoogleOAuthProvider;
