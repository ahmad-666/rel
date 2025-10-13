'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { SwiperSlide } from 'swiper/react';
import { usePathname } from 'next/navigation';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Carousel from '@/components/Carousel';
import Container from '@/components/Container';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import { type BundledLanguage as Lang } from 'shiki';

//* Types -------------------------
type LangDetails = {
    lang: Lang;
    fileName: string;
    text: string;
    color: string;
    icon: string;
};

type Props = {
    title?: string;
    description?: ReactNode;
    // method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Constants -------------------------
const langs: LangDetails[] = [
    {
        lang: 'bash',
        fileName: 'curl',
        text: 'cURL',
        color: 'neutral',
        icon: 'simple-icons:curl'
    },
    {
        lang: 'javascript',
        fileName: 'javascript',
        text: 'Javascript',
        color: 'warning',
        icon: 'simple-icons:javascript'
    },
    {
        lang: 'python',
        fileName: 'python',
        text: 'Python',
        color: 'info',
        icon: 'simple-icons:python'
    },
    {
        lang: 'php',
        fileName: 'php',
        text: 'PHP',
        color: 'pastelPurple',
        icon: 'simple-icons:php'
    }
];

//* Component -------------------------
const ApiCode = ({
    title = 'Reverse Email Lookup API- Rapid Performance',
    description = 'Power your platform with real-time contact enrichment via API. Built for developers, with clear docs and usage-based pricing.',
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    const pathname = usePathname();
    const [lang, setLang] = useState<LangDetails>(langs[0]);
    const [req, setReq] = useState('');
    const [res, setRes] = useState('');
    const loadCodes = useCallback(async () => {
        const request = (await import(`@landing/data/api/reverse-email-lookup/get/${lang.text.toLowerCase()}`)).default;
        const response = (await import(`@landing/data/api/reverse-email-lookup/get/response`)).default;
        setReq(request);
        setRes(response);
    }, [lang.text]);
    useEffect(() => {
        loadCodes();
    }, [loadCodes]);

    return (
        <div className={`from-neutral-dark4 to-brown relative bg-gradient-to-r py-16 ${className}`}>
            <Container>
                <div className='relative z-10 flex flex-col items-center justify-center'>
                    <div className='w-full text-center'>
                        <Badge text='API Access' color='success-dark4' />
                        <h2 className={`text-headline-lg mt-2 text-white ${titleClassName}`}>{title}</h2>
                    </div>
                    <div className='mt-8 flex w-full !max-w-[1000px] flex-col'>
                        <div className='bg-neutral-light4 w-full overflow-hidden rounded-md p-[2px]'>
                            <Carousel loop={false} slidesPerView='auto' wrapperClass='flex items-center'>
                                {langs.map((l) => (
                                    <SwiperSlide
                                        key={l.text}
                                        role='button'
                                        className={`text-label-md laptop:px-0 laptop:!w-1/2 flex !w-auto cursor-pointer items-center justify-center rounded-md px-14 py-1.5 text-center ${l.text === lang.text ? 'border-neutral-light2 border bg-white' : 'bg-transparent'}`}
                                        onClick={() => setLang(l)}
                                    >
                                        <p>{l.text}</p>
                                    </SwiperSlide>
                                ))}
                            </Carousel>
                        </div>
                        <div className='bg-neutral-dark3 mt-5 rounded-3xl'>
                            <div className='bg-neutral-dark4/60 w-full rounded-t-3xl p-6'>
                                <div className='flex items-center gap-0.5'>
                                    <div className='bg-error/90 size-2 rounded-full' />
                                    <div className='bg-warning/90 size-2 rounded-full' />
                                    <div className='bg-success/90 size-2 rounded-full' />
                                </div>
                            </div>
                            <div className='bg-[url("/imgs/patterns/dotted-bg.png")] bg-cover bg-center p-6'>
                                <SyntaxHighlighter
                                    title='Request'
                                    theme='poimandres'
                                    lang={lang.lang}
                                    code={req}
                                    copyToClipboard
                                    codeWrapperClassName='max-h-40'
                                />
                                <SyntaxHighlighter
                                    title='Response'
                                    theme='github-dark'
                                    lang='json'
                                    code={res}
                                    copyToClipboard
                                    className='mt-6'
                                    codeWrapperClassName='max-h-40'
                                />
                            </div>
                        </div>
                        <div className='mt-6 text-center'>
                            <p
                                className={`text-body-md text-neutral-light1 laptop:max-w-mobile mx-auto ${descriptionClassName}`}
                            >
                                {description}
                            </p>
                            <Button
                                color='white'
                                href={pathname === '/' ? '/reverse-email-lookup-api' : '/signup'}
                                queryParams={
                                    pathname === '/reverse-email-lookup-api'
                                        ? {
                                              cta_widget: 'api-code-section'
                                          }
                                        : undefined
                                }
                                className='!text-neutral-dark4 mt-8'
                            >
                                See Our API in Action
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ApiCode;
