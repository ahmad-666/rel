'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useGoogleLogin } from '@react-oauth/google';
import Box, { type BoxProps } from '@mui/material/Box';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import useStore from '@/store';
import { googleOAuth } from '@auth/services';
import { type User } from '@auth/types';

type Props = BoxProps & {
    captchaToken: string;
    onAuthenticate?: (user: User) => void;
    onError?: () => void;
};

export default function GoogleOAuth({ captchaToken, onAuthenticate, onError, ...rest }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const storeSetUser = useStore((store) => store.setUser);
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (accessToken: string) => {
            const analytics: Record<string, unknown> = {};
            searchParams.forEach((val, key) => (analytics[key] = val));
            const user = await googleOAuth({ access_token: accessToken, analytics, captchaToken });
            return user;
        },
        onSuccess: (user) => {
            onAuthenticate?.(user);
            storeSetUser(user);
            router.replace('/dashboard');
        },
        onError: () => {
            onError?.();
        }
    });
    const loginHandler = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            await mutateAsync(access_token);
        },
        onError: () => {
            onError?.();
        }
    });

    return (
        <Box {...rest}>
            <Button
                fullWidth
                variant='outlined'
                size='medium'
                bgColor='white'
                borderColor='neutral.light2'
                textColor='neutral.dark4'
                disableElevation
                disabled={!captchaToken}
                loading={isPending}
                loadingColor='primary'
                sx={{ minHeight: 36 }}
                onClick={() => loginHandler()}
            >
                <Icon icon='devicon:google' size='2sm' className='mr-2' />
                Continue with Google
            </Button>
        </Box>
    );
}
