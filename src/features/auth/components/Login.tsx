'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useTurnstile } from 'react-turnstile';
import CloudFlareCaptcha from '@/components/CloudFlareCaptcha';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Form from '@/components/Form';
import Textfield from '@/components/Textfield/Mui';
import PasswordField from '@/components/PasswordField/Mui';
import Button from '@/components/Button/Mui';
import GoogleOAuth from '@auth/components/GoogleOAuth';
import useStore from '@/store';
import { emailRegex, getPasswordChecks } from '@/utils/validation';
import { login } from '@auth/services';
import { type Response } from '@/types/Common';
import { ResponseCodes } from '@/types/ResponseCode';

type Fields = {
    email: string;
    password: string;
};
type Props = BoxProps & {};

export default function Login({ ...rest }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const storeSetUser = useStore((store) => store.setUser);
    const turnstile = useTurnstile();
    const [captchaToken, setCaptchaToken] = useState('');
    const { control, handleSubmit } = useForm<Fields>({
        mode: 'onSubmit',
        defaultValues: {
            email: searchParams.get('email') || '',
            password: ''
        }
    });
    const regenerateCaptcha = () => {
        if (turnstile) {
            turnstile.reset();
            setCaptchaToken('');
        }
    };
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async ({ email, password }: Fields) => {
            const analytics: Record<string, unknown> = {};
            searchParams.forEach((val, key) => (analytics[key] = val));
            const user = await login({ email, password, captchaToken, analytics });
            return user;
        },
        onSuccess: (user) => {
            storeSetUser(user);
            router.replace('/dashboard');
        },
        onError: (err: AxiosError<Response>) => {
            if (err.response?.data?.code === ResponseCodes.AUTH_USER_SIGNIN_NO_ACCOUNT_ERR) router.push('/signup');
            else regenerateCaptcha();
        }
    });
    const onSubmit = async ({ email, password }: Fields) => {
        await mutateAsync({ email, password });
        // reset()
    };

    return (
        <Box {...rest}>
            <Box>
                <Link href='/'>
                    <Image
                        priority
                        src='/imgs/logos/logo.png'
                        alt='reverse email lookup'
                        width={100}
                        height={100}
                        style={{ width: '45px', margin: '0 auto' }}
                    />
                    <Typography mt={4} component='h1' variant='headlineLg' color='neutral.dark4' textAlign='center'>
                        Welcome Back
                    </Typography>
                </Link>
            </Box>
            <GoogleOAuth mt={8} captchaToken={captchaToken} onError={() => regenerateCaptcha()} />
            <Divider
                textAlign='center'
                sx={{
                    mt: 8,
                    typography: 'bodySm',
                    color: 'neutral.main',
                    borderColor: 'neutral.light4',
                    '& .MuiDivider-wrapper': {
                        px: 3
                    }
                }}
            >
                OR
            </Divider>
            <Box mt={10}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name='email'
                        rules={{
                            required: 'Field is required',
                            validate: (val) => emailRegex.test(val) || 'Email is not valid'
                        }}
                        render={({ field, fieldState }) => (
                            <Textfield
                                {...field}
                                type='email'
                                variant='outlined'
                                size='md'
                                color='primary'
                                label='Work Email'
                                labelPos='outside'
                                bgColor='white'
                                borderColor='neutral.light2'
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{ mt: 8 }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        rules={{
                            validate: (val) => {
                                const checks = getPasswordChecks({
                                    required: true,
                                    minLength8: true
                                });
                                const error = checks.find((check) => !check.validator(val));
                                return error?.message || true;
                            }
                        }}
                        render={({ field, fieldState }) => (
                            <PasswordField
                                {...field}
                                variant='outlined'
                                size='md'
                                color='primary'
                                label='Password'
                                labelPos='outside'
                                bgColor='white'
                                borderColor='neutral.light2'
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{ mt: 8 }}
                            />
                        )}
                    />
                    <Stack mt={3} justifyContent='flex-end'>
                        <Button
                            href='/forget-password'
                            variant='text'
                            size='small'
                            preserveUrlQueries
                            color='primary'
                            textColor='primary.main'
                            sx={{
                                p: 1,
                                typography: 'labelMd'
                            }}
                        >
                            Forgot your password ?
                        </Button>
                    </Stack>
                    <CloudFlareCaptcha
                        size='invisible'
                        onVerify={(captchaToken) => setCaptchaToken(captchaToken)}
                        hideMessage
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        size='medium'
                        color='primary'
                        disabled={!captchaToken}
                        loading={isPending}
                        sx={{ mt: 8, minHeight: 36 }}
                    >
                        {captchaToken ? 'Log in' : 'Loading Captcha...'}
                    </Button>
                    <Typography mt={6} component='p' variant='labelLg' color='neutral.dark4' align='center'>
                        Don’t have an account?{' '}
                        <Button
                            href='/signup'
                            variant='text'
                            size='small'
                            preserveUrlQueries
                            color='primary'
                            textColor='primary.main'
                            sx={{
                                mt: -0.5,
                                p: 1
                            }}
                        >
                            Sign up
                        </Button>
                    </Typography>
                </Form>
            </Box>
        </Box>
    );
}
