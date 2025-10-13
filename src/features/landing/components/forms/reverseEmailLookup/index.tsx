'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import Image from 'next/image';
import Form from '@/components/Form';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Textfield from '@/components/Textfield';
import InfoGrid from '@landing/components/forms/reverseEmailLookup/Info';
import Banner from '@landing/components/forms/reverseEmailLookup/Banner';
import SocialMediaLinks from '@landing/components/forms/reverseEmailLookup/SocialMediaLinks';
import { userInfo, personSocialMedia, companyInfo, companySocialMedia } from '@landing/data/emailLookup';
import useStore from '@/store';
import { getEmailLookup } from '@landing/services/services';
import useBreakpoint from '@/hooks/useBreakpoint';
import { emailRegex } from '@/utils/validation';
import { type Response } from '@/types/Common';
import { type EmailLookup } from '@landing/types/service';

//* Types -----------------------------
type Props = {
    className?: string;
};

//* Main Component --------------------
const ReverseEmailLookup = ({ className = '' }: Props) => {
    const { mobileOnly } = useBreakpoint();
    //* Store
    const isLoggedIn = useStore((state) => state.isLoggedIn());

    //* States
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    //* Form
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<{ email: string }>({
        mode: 'onSubmit',
        defaultValues: {
            email: ''
        }
    });

    //* Mutation
    const { isPending, mutateAsync, data, isError } = useMutation<EmailLookup, AxiosError<Response>, { email: string }>(
        {
            mutationFn: async ({ email }) => {
                const data = await getEmailLookup({ email });
                return data;
            }
        }
    );

    //* Memoized values
    const showError = useMemo(
        () => isSubmitted && (isError || !data?.exists) && !isPending,
        [isSubmitted, isError, data?.exists, isPending]
    );

    //* Memoized callbacks
    const onSubmit = useCallback(
        async ({ email }: { email: string }) => {
            setIsSubmitted(true);
            await mutateAsync({ email });
        },
        [mutateAsync]
    );

    const handleErrorDismiss = useCallback(() => {
        setShowErrorMessage(false);
    }, []);

    //* Effect to show error message if email is empty
    useEffect(() => {
        if (errors.email) {
            setShowErrorMessage(true);
            const timer = setTimeout(handleErrorDismiss, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors.email, handleErrorDismiss]);

    //* Memoized form render
    const renderForm = useCallback(
        () => (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='border-neutral-light2 flex w-full items-center gap-2 rounded-lg border bg-white p-2'>
                    <div className='tablet:flex-row flex w-full gap-2'>
                        <Controller
                            control={control}
                            name='email'
                            rules={{
                                required: 'Email is required',
                                pattern: { value: emailRegex, message: 'Invalid email address' }
                            }}
                            render={({ field }) => (
                                <div className='flex-1'>
                                    <Textfield
                                        {...field}
                                        size='md'
                                        placeholder='Enter an email address...'
                                        inputClassName='border-0'
                                        clearable
                                    />
                                </div>
                            )}
                        />
                    </div>
                    <Button
                        type='submit'
                        variant='fill'
                        color='neutral-dark4'
                        size={mobileOnly ? 'md' : 'lg'}
                        className='hover:bg-neutral-dark3 shrink-0 !px-6'
                        loading={isPending}
                    >
                        Find Contact
                    </Button>
                </div>
            </Form>
        ),
        [control, handleSubmit, onSubmit, isPending, mobileOnly]
    );
    const renderTryNow = !showError && !data?.exists && !isPending;
    return (
        <div className='mx-auto max-w-[1000px] text-start'>
            <div className={`max-w-tablet relative mx-auto overflow-visible ${className} `}>
                <div className={`max-w-mobile relative mx-auto ${renderTryNow ? 'pb-10' : ''}`}>
                    {renderForm()}
                    {showErrorMessage && errors.email && (
                        <p className='text-label-lg text-error mt-2'>{errors.email.message}</p>
                    )}
                    {renderTryNow && (
                        <div>
                            <p className='text-title-lg text-neutral-dark4 mt-6 text-center'>
                                🔥 Try now with +1B Professional Profiles
                            </p>
                            <Image
                                src='/imgs/others/arrow.png'
                                alt='arrow-icon'
                                width={160}
                                height={160}
                                quality={100}
                                loading='lazy'
                                className='laptop:block absolute bottom-0 left-0 hidden h-auto w-22 object-cover'
                            />
                        </div>
                    )}
                </div>
            </div>
            {data?.exists && (
                <div className='animate-fade-in mt-7'>
                    <Banner title='Sign Up for Free and Unlock All Data' isLoggedIn={isLoggedIn} />
                    <div className='divide-neutral-light4 mt-5 divide-y rounded-xl bg-white p-6'>
                        <div className='flex items-center justify-between gap-x-5 pb-5'>
                            <div className='flex items-center gap-x-3'>
                                <Image
                                    src={`https://${data?.person.avatar}`}
                                    alt='user-image'
                                    width={80}
                                    height={80}
                                    className='h-12 w-12 rounded-lg'
                                    loading='lazy'
                                    priority={false}
                                />
                                <div className='flex flex-col'>
                                    <div className='flex items-center gap-x-1'>
                                        {data?.person.full_name && (
                                            <p className='text-title-md text-neutral-dark4 line-clamp-1'>
                                                {data?.person.full_name}
                                            </p>
                                        )}
                                        {data?.person.is_ceo && (
                                            <Badge text='CEO ' color='primary-dark2' className='!bg-primary-light5' />
                                        )}
                                    </div>
                                    {data?.person.job_title && (
                                        <p className='text-body-sm text-neutral line-clamp-1'>
                                            {data?.person.job_title}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <SocialMediaLinks data={data} socialMedia={personSocialMedia} />
                        </div>
                        <InfoGrid data={data} infoItems={userInfo} />
                    </div>
                    <div className='divide-neutral-light4 mt-3 divide-y rounded-xl bg-white p-6'>
                        <div className='flex items-center justify-between gap-x-5 pb-5'>
                            <div className='flex items-center gap-x-3'>
                                <Image
                                    src={`https://media.reverseemaillookup.net/company_profile/${data?.person.company_linkedin_url?.split('/').pop()}`}
                                    alt='company-image'
                                    width={80}
                                    height={80}
                                    className='h-12 w-12 rounded-lg'
                                    loading='lazy'
                                    priority={false}
                                />
                                <p className='text-label-lg text-neutral-dark4 line-clamp-2 overflow-hidden text-ellipsis'>
                                    {data?.person.company_name}
                                </p>
                            </div>
                            <SocialMediaLinks data={data} socialMedia={companySocialMedia} />
                        </div>
                        <InfoGrid data={data} infoItems={companyInfo} />
                    </div>
                </div>
            )}
            {showError && (
                <div className='max-w-mobile animate-fade-in from-neutral-dark4 to-brown relative mx-auto mt-7 overflow-hidden rounded-xl bg-gradient-to-r px-5 py-8'>
                    <div className='relative z-10 flex flex-col items-center justify-center'>
                        <p className='text-body-sm text-white'>You&apos;ve reached your limit</p>
                        <p className='text-headline-sm mt-1 text-center font-semibold text-white'>
                            Sign up for free to get 15 credits.
                        </p>
                        <Button
                            variant='fill'
                            color='white'
                            size='md'
                            href={`${isLoggedIn ? '/dashboard' : '/signup'}`}
                            queryParams={isLoggedIn ? undefined : { cta_widget: 'landing-banner-signup' }}
                            className='!text-neutral-dark4 mt-5'
                        >
                            Sign up for free
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ReverseEmailLookup;
