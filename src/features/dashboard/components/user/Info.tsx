'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@/components/Button/Mui';
import Form from '@/components/Form';
import Textfield from '@/components/Textfield/Mui';
import PasswordField from '@/components/PasswordField/Mui';
import useStore from '@/store';
import useSnackbar from '@/hooks/useSnackbar';
import dayjs from '@/libs/dayjs';
import { numberFormatter } from '@/utils';
import { PASSWORD_LENGTH } from '@auth/configs';
import { changePassword } from '@dashboard/services/user';

type Fields = {
    name: string;
    email: string;
    registerDate: string;
    currentPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
} & { plan: string };
type Props = BoxProps & {};

export default function UserInfo({ ...rest }: Props) {
    const { setSnackbar } = useSnackbar();
    const { name, email, credits, activePlan, imgSrc, registerDate } = useStore((store) => store.user || {});
    const planUsagePercentage = ((credits || 0) / (activePlan?.totalCredits || 1)) * 100;
    const { control, setValue, handleSubmit } = useForm<Fields>({
        defaultValues: {
            name: '',
            email: '',
            plan: '',
            registerDate: '',
            currentPassword: '',
            newPassword: '',
            newPasswordRepeat: ''
        }
    });
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async ({ currentPassword, newPassword }: Pick<Fields, 'currentPassword' | 'newPassword'>) => {
            await changePassword({ current_password: currentPassword, new_password: newPassword });
        },
        onSuccess: () => {
            setSnackbar({ show: true, type: 'success', message: 'Password changed successfully' });
        }
    });
    const onSubmit = async ({ currentPassword, newPassword }: Fields) => {
        await mutateAsync({ currentPassword, newPassword });
    };
    useEffect(() => {
        setValue('name', name);
        setValue('email', email);
        setValue('plan', activePlan?.name || '');
        setValue('registerDate', registerDate);
    }, [name, email, activePlan, registerDate, setValue]);

    return (
        <Box {...rest}>
            <Stack
                direction={{ mobile: 'column', laptop: 'row' }}
                gap={5}
                alignItems={{ mobile: 'start', laptop: 'start' }}
            >
                <Box flexShrink={0} width={{ mobile: 1, laptop: 180, desktop: 220, desktopXl: 500 }}>
                    <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                        Avatar
                    </Typography>
                    <Typography mt={2} component='p' variant='bodyMd' color='neutral'>
                        Edit your avatar
                    </Typography>
                </Box>
                <Box>
                    <Avatar
                        src={imgSrc || '/imgs/avatars/defaults/fill-light-blur.png'}
                        alt={name}
                        sx={{
                            width: '80px',
                            height: '80px'
                        }}
                    />
                </Box>
            </Stack>
            <Divider sx={{ borderColor: 'neutral.light3', my: 8 }} />
            <Stack
                direction={{ mobile: 'column', laptop: 'row' }}
                gap={5}
                alignItems={{ mobile: 'start', laptop: 'end' }}
            >
                <Box flexShrink={0} width={{ mobile: 1, laptop: 180, desktop: 220, desktopXl: 500 }}>
                    <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                        Credits Usage
                    </Typography>
                    <Typography mt={2} component='p' variant='bodyMd' color='neutral'>
                        Your credit usage
                    </Typography>
                    <Button
                        variant='outlined'
                        size='medium'
                        color='neutral'
                        href='/dashboard/plans'
                        outlineColor='neutral.light2'
                        textColor='neutral.dark4'
                        sx={{ mt: 8 }}
                    >
                        Upgrade Your Plan
                    </Button>
                </Box>
                <Box>
                    <Box
                        mt={5}
                        width={1}
                        px={2}
                        py={3.5}
                        borderRadius={3}
                        bgcolor='neutral.light4'
                        overflow='hidden'
                        position='relative'
                        zIndex={1}
                    >
                        <Stack justifyContent='center' alignItems='center' gap={1}>
                            <Image
                                src='/imgs/others/triangle.png'
                                alt='credits'
                                width={25}
                                height={25}
                                style={{ width: '18px', flexShrink: 0 }}
                            />
                            <Typography component='p' variant='bodySm' color='neutral.dark4'>
                                {numberFormatter(credits || 0)} credits remaining
                            </Typography>
                        </Stack>
                        <Box
                            position='absolute'
                            width={1}
                            height={1}
                            left={0}
                            top={0}
                            zIndex={-1}
                            sx={{
                                opacity: 0.25,
                                backgroundImage: 'linear-gradient(to right,#8ADFFF,#C274FF,#FF669A,#FBB230)',
                                transform: `scaleX(${planUsagePercentage / 100})`,
                                transformOrigin: 'left center'
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
            <Divider sx={{ borderColor: 'neutral.light3', my: 8 }} />
            <Stack
                direction={{ mobile: 'column', laptop: 'row' }}
                gap={5}
                alignItems={{ mobile: 'start', laptop: 'start' }}
            >
                <Box flexShrink={0} width={{ mobile: 1, laptop: 180, desktop: 220, desktopXl: 500 }}>
                    <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                        Account Info
                    </Typography>
                    <Typography mt={2} component='p' variant='bodyMd' color='neutral'>
                        Your account information
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Grid container spacing={4}>
                        <Grid size={{ mobile: 12, tablet: 6, desktop: 4, desktopXl: 3 }}>
                            <Controller
                                control={control}
                                name='name'
                                render={({ field }) => (
                                    <Textfield
                                        readOnly
                                        variant='filled'
                                        size='sm'
                                        value={field.value}
                                        bgColor='neutral.light4'
                                        textColor='neutral.main'
                                        placeholder='Name'
                                        labelPos='outside'
                                        label='Name'
                                        hideMessage
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ mobile: 12, tablet: 6, desktop: 4, desktopXl: 3 }}>
                            <Controller
                                control={control}
                                name='email'
                                render={({ field }) => (
                                    <Textfield
                                        type='email'
                                        readOnly
                                        variant='filled'
                                        size='sm'
                                        value={field.value}
                                        bgColor='neutral.light4'
                                        textColor='neutral.main'
                                        placeholder='Email'
                                        labelPos='outside'
                                        label='Email'
                                        hideMessage
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ mobile: 12, tablet: 6, desktop: 4, desktopXl: 3 }}>
                            <Controller
                                control={control}
                                name='registerDate'
                                render={({ field }) => (
                                    <Textfield
                                        readOnly
                                        variant='filled'
                                        size='sm'
                                        value={dayjs(field.value).format('DD MMMM, YYYY')}
                                        bgColor='neutral.light4'
                                        textColor='neutral.main'
                                        placeholder='Register Date'
                                        labelPos='outside'
                                        label='Registration Date'
                                        hideMessage
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Divider sx={{ borderColor: 'neutral.light3', my: 8 }} />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction={{ mobile: 'column', laptop: 'row' }}
                    gap={5}
                    alignItems={{ mobile: 'start', laptop: 'end' }}
                >
                    <Box flexShrink={0} width={{ mobile: 1, laptop: 180, desktop: 220, desktopXl: 500 }}>
                        <Typography component='h3' variant='titleLg' color='neutral.dark4'>
                            Security
                        </Typography>
                        <Typography mt={2} component='p' variant='bodyMd' color='neutral'>
                            You can change your password
                        </Typography>
                        <Button
                            type='submit'
                            variant='outlined'
                            size='medium'
                            color='neutral'
                            outlineColor='neutral.light2'
                            textColor='neutral.dark4'
                            loading={isPending}
                            sx={{ mt: 8, px: 12 }}
                        >
                            Save
                        </Button>
                    </Box>
                    <Box flexGrow={1}>
                        <Grid container spacing={4}>
                            <Grid size={{ mobile: 12, tablet: 6, desktop: 4, desktopXl: 3 }}>
                                <Controller
                                    control={control}
                                    name='currentPassword'
                                    rules={{
                                        required: 'Required'
                                    }}
                                    render={({ field, fieldState }) => (
                                        <PasswordField
                                            {...field}
                                            variant='outlined'
                                            size='sm'
                                            color='primary'
                                            labelPos='outside'
                                            label='Current Password'
                                            placeholder='Enter current password...'
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ mobile: 12, tablet: 6, desktop: 4, desktopXl: 3 }}>
                                <Controller
                                    control={control}
                                    name='newPassword'
                                    rules={{
                                        required: 'Required',
                                        minLength: {
                                            value: PASSWORD_LENGTH,
                                            message: `Password should have at least ${PASSWORD_LENGTH} characters`
                                        }
                                    }}
                                    render={({ field, fieldState }) => (
                                        <PasswordField
                                            {...field}
                                            variant='outlined'
                                            size='sm'
                                            color='primary'
                                            labelPos='outside'
                                            label='New Password'
                                            placeholder='Enter new password...'
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ mobile: 12, tablet: 6, desktop: 4, desktopXl: 3 }}>
                                <Controller
                                    control={control}
                                    name='newPasswordRepeat'
                                    rules={{
                                        required: 'Required',
                                        validate: (val, form) =>
                                            val === form.newPassword || 'Should be same as new password'
                                    }}
                                    render={({ field, fieldState }) => (
                                        <PasswordField
                                            {...field}
                                            variant='outlined'
                                            size='sm'
                                            color='primary'
                                            labelPos='outside'
                                            label='Repeat New Password'
                                            placeholder='Enter new password again...'
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </Form>
        </Box>
    );
}
