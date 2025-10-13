'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useTurnstile } from 'react-turnstile';
import CloudFlareCaptcha from '@/components/CloudFlareCaptcha';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Form from '@/components/Form';
import Textfield from '@/components/Textfield/Mui';
import PasswordField from '@/components/PasswordField/Mui';
import OTP from '@/components/OTP/Mui';
import Button from '@/components/Button/Mui';
import GoogleOAuth from '@auth/components/GoogleOAuth';
import useStore from '@/store';
import { emailRegex, getPasswordChecks } from '@/utils/validation';
import { signup, signupConfirm } from '@auth/services';
import { type Response } from '@/types/Common';
import { ResponseCodes } from '@/types/ResponseCode';

type Step = 'info' | 'otp';
type Fields = {
    name: string;
    email: string;
    password: string;
    otp: string;
};
type Props = BoxProps & {};

export default function Signup({ ...rest }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const turnstile = useTurnstile();
    const storeSetUser = useStore((store) => store.setUser);
    const [step, setStep] = useState<Step>('info');
    const [shouldResend, setShouldReSend] = useState(false);
    const [captchaToken, setCaptchaToken] = useState('');
    const { control, getValues, handleSubmit } = useForm<Fields>({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            email: searchParams.get('email') || '',
            password: '',
            otp: ''
        }
    });
    const enteredEmail = getValues('email');
    const regenerateCaptcha = () => {
        if (turnstile) {
            turnstile.reset();
            setCaptchaToken('');
        }
    };
    const resendHandler = () => {
        setShouldReSend(true);
        regenerateCaptcha();
    };
    const changeEmailHandler = () => {
        setStep('info');
        regenerateCaptcha();
    };
    const { isPending: signupLoading, mutateAsync: signupReq } = useMutation({
        mutationFn: async ({ name, email, password }: Omit<Fields, 'otp'>) => {
            const analytics: Record<string, unknown> = {};
            searchParams.forEach((val, key) => (analytics[key] = val));
            await signup({ full_name: name, email, password, captchaToken, analytics });
        },
        onSuccess: () => {
            if (step === 'info') {
                setStep('otp');
                regenerateCaptcha();
            }
        },
        onError: (err: AxiosError<Response>) => {
            if (err.response?.data?.code === ResponseCodes.AUTH_SIGNUP_EMAIL_EXISTS_ERR) router.push('/login');
            else regenerateCaptcha();
        },
        onSettled: () => {
            setShouldReSend(false);
        }
    });
    const { isPending: signupConfirmLoading, mutateAsync: signupConfirmReq } = useMutation({
        mutationFn: async ({ email, otp }: Pick<Fields, 'email' | 'otp'>) => {
            const user = await signupConfirm({ email, code: otp, captchaToken });
            return user;
        },
        onSuccess: (user) => {
            storeSetUser(user);
            router.replace('/dashboard');
        },
        onError: () => {
            regenerateCaptcha();
        }
    });
    const onSubmit = async ({ name, email, password, otp }: Fields) => {
        if (step === 'info') await signupReq({ name, email, password });
        else if (step === 'otp') await signupConfirmReq({ email, otp });
        // reset()
    };
    useEffect(() => {
        //for handling 'resend' ... we use useEffect and separate shouldResend state to be sure that captcha token is ready when we resend signupReq
        if (shouldResend && captchaToken) {
            const [name, email, password] = getValues(['name', 'email', 'password']);
            signupReq({
                name,
                email,
                password
            });
        }
    }, [shouldResend, captchaToken, getValues, signupReq]);

    return (
        <Box {...rest}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {step === 'info' && (
                    <Box>
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
                                <Typography
                                    mt={4}
                                    component='h1'
                                    variant='headlineLg'
                                    color='neutral.dark4'
                                    textAlign='center'
                                >
                                    Create An Account
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
                            <Controller
                                control={control}
                                name='name'
                                rules={{ required: 'Field is required' }}
                                render={({ field, fieldState }) => (
                                    <Textfield
                                        {...field}
                                        type='text'
                                        variant='outlined'
                                        size='md'
                                        color='primary'
                                        label='Full Name'
                                        labelPos='outside'
                                        bgColor='white'
                                        borderColor='neutral.light2'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
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
                                        const checks = getPasswordChecks({ required: true, minLength8: true });
                                        const error = checks.find((check) => !check.validator(val));
                                        return error?.message || true;
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        {...field}
                                        checks={getPasswordChecks({ required: true, minLength8: true })}
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
                            <Typography
                                mt={8}
                                component='p'
                                variant='labelMd'
                                color='neutral'
                                sx={{
                                    '& a': {
                                        color: 'primary.main',
                                        typography: 'labelMd',
                                        ml: 1
                                    }
                                }}
                            >
                                By clicking on sign up you will accept the{' '}
                                <Link href='/privacy-policy'>privacy policy & terms and condition</Link>
                            </Typography>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                size='medium'
                                color='primary'
                                disabled={!captchaToken}
                                loading={signupLoading}
                                sx={{ mt: 6, minHeight: 36 }}
                            >
                                {captchaToken ? 'Sign up' : 'Loading Captcha...'}
                            </Button>
                            <Typography mt={6} component='p' variant='labelLg' color='neutral.dark4' align='center'>
                                Already have an account?{' '}
                                <Button
                                    href='/login'
                                    variant='text'
                                    size='small'
                                    preserveUrlQueries
                                    color='primary'
                                    textColor='primary.main'
                                    sx={{
                                        minWidth: 'initial',
                                        mt: -0.5,
                                        p: 1
                                        // typography: 'labelMd'
                                    }}
                                >
                                    Log in
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                )}
                {step === 'otp' && (
                    <Box>
                        <Box>
                            <Image
                                src='/imgs/others/envelope.png'
                                alt='email'
                                width={200}
                                height={200}
                                style={{ width: '125px', margin: '0 auto' }}
                            />
                            <Typography mt={6} component='h2' variant='titleLg' color='neutral.dark4' align='center'>
                                Verify your email address
                            </Typography>
                            <Typography mt={3} component='p' variant='bodyMd' color='neutral.main' align='center'>
                                We’ve just sent 6-digit code to: {enteredEmail}
                            </Typography>
                        </Box>
                        <Box mt={10}>
                            <Controller
                                control={control}
                                name='otp'
                                rules={{
                                    required: 'Field is required',
                                    minLength: { value: 6, message: 'Enter full code' }
                                }}
                                render={({ field, fieldState }) => (
                                    <OTP
                                        value={field.value}
                                        onChange={(newVal) => field.onChange(newVal)}
                                        length={6}
                                        size='lg'
                                        color='primary'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                size='medium'
                                color='primary'
                                disabled={!captchaToken}
                                loading={signupConfirmLoading}
                                sx={{ mt: 10, minHeight: 36 }}
                            >
                                {captchaToken ? 'Submit' : 'Loading Captcha...'}
                            </Button>
                            <Typography
                                mt={6}
                                component='p'
                                variant='labelLg'
                                color='neutral.dark4'
                                // align='center'
                                sx={{
                                    '& a': {
                                        color: 'primary.main',
                                        typography: 'labelLg',
                                        ml: 1
                                    }
                                }}
                            >
                                Haven’t see the email? check your spam folder,{' '}
                                <Button
                                    type='button'
                                    variant='text'
                                    size='small'
                                    color='primary'
                                    textColor='primary.main'
                                    onClick={resendHandler}
                                    sx={{ px: 2, py: 1, minWidth: 'initial' }}
                                >
                                    Resend
                                </Button>{' '}
                                or{' '}
                                <Button
                                    type='button'
                                    variant='text'
                                    size='small'
                                    color='primary'
                                    textColor='primary.main'
                                    onClick={changeEmailHandler}
                                    sx={{ px: 2, py: 1, minWidth: 'initial' }}
                                >
                                    Change Email
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                )}
                <CloudFlareCaptcha
                    size='invisible'
                    onVerify={(captchaToken) => setCaptchaToken(captchaToken)}
                    hideMessage
                />
            </Form>
        </Box>
    );
}
