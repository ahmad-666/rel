'use client';

import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Container from '@/components/Container/Mui';
import Form from '@/components/Form';
import Textfield from '@/components/Textfield/Mui';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import EmailLookupUser from '@dashboard/components/email-lookup/User';
import EmailLookupCompany from '@dashboard/components/email-lookup/Company';
import useStore from '@/store';
import { emailRegex } from '@/utils/validation';
import { getEmailLookups } from '@dashboard/services/email-lookup';

type Fields = {
    email: string;
};
type Props = BoxProps & {};

export default function EmailLookupForm({ ...rest }: Props) {
    const apiKey = useStore((store) => store.user.apiKey);
    const { control, formState, handleSubmit } = useForm<Fields>({
        mode: 'onSubmit',
        defaultValues: {
            email: ''
        }
    });
    const { isSubmitSuccessful, errors } = formState;
    const hasError = !!errors.email;
    const errorMessage = errors.email?.message;
    const {
        isPending,
        mutateAsync: emailLookupMutate,
        data
    } = useMutation({
        mutationFn: async ({ email }: Fields) => {
            const res = await getEmailLookups({ email, apiKey });
            return res;
        }
    });
    const onSubmit = async ({ email }: Fields) => {
        await emailLookupMutate({ email });
    };

    return (
        <Box {...rest}>
            <Container size='xs'>
                <Typography component='h2' variant='titleLg' color='neutral.dark4'>
                    Enter an email address
                </Typography>
                <Box mt={5}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            overflow='hidden'
                            p={1}
                            border={1}
                            borderColor='neutral.light2'
                            borderRadius={3}
                            flexDirection={{
                                mobile: 'column',
                                tablet: 'row'
                            }}
                            justifyContent={{
                                tablet: 'space-between'
                            }}
                            alignItems='center'
                            gap={2}
                        >
                            <Controller
                                control={control}
                                name='email'
                                rules={{
                                    required: 'Field is required',
                                    pattern: {
                                        value: emailRegex,
                                        message: 'Invalid email address'
                                    }
                                }}
                                render={({ field }) => (
                                    <Textfield
                                        {...field}
                                        type='email'
                                        variant='outlined'
                                        borderColor='transparent'
                                        placeholder='Enter an email...'
                                        hideMessage
                                        // error={!!fieldState.error}
                                        // helperText={fieldState.error?.message}
                                        sx={{
                                            width: 1,
                                            flexGrow: 1
                                        }}
                                    />
                                )}
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                size='medium'
                                minHeight={40}
                                bgColor='neutral.dark4'
                                loading={isPending}
                                sx={{
                                    flexShrink: 0,
                                    px: 6
                                }}
                            >
                                Find Contact
                            </Button>
                        </Stack>
                    </Form>
                    {hasError && (
                        <FormHelperText error={hasError} sx={{ mt: 2 }}>
                            {errorMessage}
                        </FormHelperText>
                    )}
                </Box>
                {!!(!isPending && isSubmitSuccessful && !data?.isExist) && (
                    <Stack
                        mt={6}
                        justifyContent='space-between'
                        alignItems='center'
                        bgcolor='neutral.light5'
                        p={3}
                        border={1}
                        borderColor='neutral.light3'
                        borderRadius={3}
                    >
                        <Typography component='p' variant='bodySm' color='neutral.dark4'>
                            <Icon icon='ph:warning-diamond-duotone' size='md' color='error' className='mr-2' />
                            No user found for the entered email !
                        </Typography>
                    </Stack>
                )}
            </Container>
            {data?.isExist && (
                <Container mt={6} size='md'>
                    <EmailLookupUser {...data.user!} companyName={data.company!.name} />
                    <EmailLookupCompany mt={4} {...data.company!} />
                </Container>
            )}
        </Box>
    );
}
