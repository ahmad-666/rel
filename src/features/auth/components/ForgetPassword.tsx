'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useTurnstile } from 'react-turnstile';
import CloudFlareCaptcha from '@/components/CloudFlareCaptcha';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Form from '@/components/Form';
import Textfield from '@/components/Textfield/Mui';
import PasswordField from '@/components/PasswordField/Mui';
import OTP from '@/components/OTP/Mui';
import Button from '@/components/Button/Mui';
import useSnackbar from '@/hooks/useSnackbar';
import { emailRegex, getPasswordChecks } from '@/utils/validation';
import { forgetPassword, resetPassword } from '@auth/services';

type Step = 'forget-password' | 'reset-password';
type Fields = {
    email: string;
    otp: string;
    newPassword: string;
    newPasswordRepeat: string;
};
type Props = BoxProps & {};

export default function ForgetPassword({ ...rest }: Props) {
    const router = useRouter();
    const turnstile = useTurnstile();
    const { setSnackbar } = useSnackbar();
    const [step, setStep] = useState<Step>('forget-password');
    const [captchaToken, setCaptchaToken] = useState('');
    const { control, handleSubmit } = useForm<Fields>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            otp: '',
            newPassword: '',
            newPasswordRepeat: ''
        }
    });
    const regenerateCaptcha = () => {
        if (turnstile) {
            turnstile.reset();
            setCaptchaToken('');
        }
    };
    const changeEmailHandler = () => {
        setStep('forget-password');
        regenerateCaptcha();
    };
    const { isPending: forgetPasswordLoading, mutateAsync: forgetPasswordReq } = useMutation({
        mutationFn: async ({ email }: Pick<Fields, 'email'>) => {
            await forgetPassword({ email, captchaToken });
        },
        onSuccess: () => {
            if (step === 'forget-password') {
                setStep('reset-password');
                regenerateCaptcha();
            }
        },
        onError: () => {
            regenerateCaptcha();
        }
    });
    const { isPending: resetPasswordLoading, mutateAsync: resetPasswordReq } = useMutation({
        mutationFn: async ({ email, otp, newPassword }: Fields) => {
            await resetPassword({ email, code: otp, new_password: newPassword, captchaToken });
        },
        onSuccess: () => {
            setSnackbar({
                show: true,
                type: 'success',
                message: 'Your password has been reset successfully. You can now log in with your new password.'
            });
            router.push('/login');
        },
        onError: () => {
            regenerateCaptcha();
        }
    });
    const onSubmit = async ({ email, otp, newPassword, newPasswordRepeat }: Fields) => {
        if (step === 'forget-password') await forgetPasswordReq({ email });
        else if (step === 'reset-password') await resetPasswordReq({ email, otp, newPassword, newPasswordRepeat });
        // reset()
    };

    return (
        <Box {...rest}>
            <Box>
                <Image
                    src='/imgs/others/lock.png'
                    alt='reverse email lookup'
                    width={200}
                    height={200}
                    style={{ width: '170px', margin: '0 auto' }}
                />
                <Typography mt={4} component='h1' variant='titleLg' color='neutral.dark4' textAlign='center'>
                    Forgot Your Password?
                </Typography>
                <Typography mt={2} component='p' variant='bodyMd' color='neutral.main' textAlign='center'>
                    {step === 'forget-password'
                        ? 'Enter the email address associated with your account.'
                        : 'Please enter the verification code we sent you and then enter your new password.'}
                </Typography>
            </Box>
            <Box mt={8}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {step === 'forget-password' && (
                        <Box>
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
                                        labelPos='outside'
                                        label='Work Email'
                                        placeholder='Enter your work email...'
                                        bgColor='white'
                                        borderColor='neutral.light2'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        sx={{ mt: 8 }}
                                    />
                                )}
                            />
                        </Box>
                    )}
                    {step === 'reset-password' && (
                        <Box>
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
                            <Controller
                                control={control}
                                name='newPassword'
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
                                        labelPos='outside'
                                        label='New Password'
                                        placeholder='Enter your new password...'
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
                                name='newPasswordRepeat'
                                rules={{
                                    required: 'Field is required',
                                    validate: (val, form) => val === form.newPassword || 'Passwords do not match'
                                }}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        {...field}
                                        variant='outlined'
                                        size='md'
                                        color='primary'
                                        labelPos='outside'
                                        label='Repeat New Password'
                                        placeholder='Repeat your new password...'
                                        bgColor='white'
                                        borderColor='neutral.light2'
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        sx={{ mt: 8 }}
                                    />
                                )}
                            />
                            <Stack mt={1} justifyContent='flex-end'>
                                <Button
                                    variant='text'
                                    size='small'
                                    color='primary'
                                    textColor='primary.main'
                                    onClick={changeEmailHandler}
                                >
                                    Change Email
                                </Button>
                            </Stack>
                        </Box>
                    )}
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
                        loading={forgetPasswordLoading || resetPasswordLoading}
                        sx={{ mt: 12, minHeight: 36 }}
                    >
                        {!captchaToken
                            ? 'Captcha Loading...'
                            : step === 'forget-password'
                              ? 'Send Instructions'
                              : 'Change Password'}
                    </Button>
                    <Typography mt={6} component='p' variant='labelLg' color='neutral.dark4' align='center'>
                        Back to{' '}
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
                </Form>
            </Box>
        </Box>
    );
}
