'use client';

import { type ReactNode } from 'react';
import Image from 'next/image';
import AutoPlaySlider from '@/components/AutoPlaySlider';
import useColor from '@/hooks/useColor';

//* Types -----------------------------
type Company = {
    name: string;
    imgSrc: string;
    width?: number;
    height?: number;
};

type TrustedCompaniesProps = {
    title?: ReactNode;
    companies?: Company[];
    cloneCount?: number;
    fade?: boolean;
    fadeColor?: string;
    titleClassName?: string;
    imgClassName?: string;
    className?: string;
};

//* Constants -------------------------
const DEFAULT_COMPANIES: Company[] = [
    {
        name: 'adobe',
        imgSrc: '/imgs/companies/adobe.png'
    },
    {
        name: 'amazon',
        imgSrc: '/imgs/companies/amazon.png'
    },
    {
        name: 'hubspot',
        imgSrc: '/imgs/companies/hubspot.png'
    },
    {
        name: 'facebook',
        imgSrc: '/imgs/companies/facebook.png'
    },
    {
        name: 'quora',
        imgSrc: '/imgs/companies/quora.png'
    },
    {
        name: 'google',
        imgSrc: '/imgs/companies/google.png'
    },
    {
        name: 'visa',
        imgSrc: '/imgs/companies/visa-2.png',
        height: 34
    }
];

//* Component -------------------------
const TrustedCompanies = ({
    title = 'Trusted by industry leaders worldwide.',
    companies = DEFAULT_COMPANIES,
    cloneCount = 2,
    fade = true,
    fadeColor = 'primary-light5',
    titleClassName = '',
    imgClassName = '',
    className = ''
}: TrustedCompaniesProps) => {
    const parsedFadeColor = useColor(fadeColor);
    return (
        <div className={`py-8 ${className}`}>
            <h2 className={`text-title-md text-neutral text-center ${titleClassName}`}>{title}</h2>
            {/* <div className='max-w-tablet relative mx-auto mt-6'>
                <AutoPlaySlider cloneCount={cloneCount} slides={companies} speed={companies.length * 5000} space={24}>
                    {(slide) => (
                        <div className='flex w-24 flex-col items-center justify-center'>
                            <Image
                                src={slide.imgSrc}
                                alt={slide.name}
                                width={200}
                                height={200}
                                className={`h-auto w-auto max-w-full ${imgClassName}`}
                                style={{
                                    width: slide.width && `${slide.width}px`,
                                    height: slide.height && `${slide.height}px`
                                }}
                            />
                        </div>
                    )}
                </AutoPlaySlider>
                {fade && (
                    <>
                        <div
                            className='pointer-events-none absolute top-0 left-0 z-1 h-full w-[30%]'
                            style={{
                                background: `linear-gradient(to right,${parsedFadeColor},transparent)`
                            }}
                        />
                        <div
                            className='pointer-events-none absolute top-0 right-0 z-1 h-full w-[30%]'
                            style={{
                                background: `linear-gradient(to right,transparent,${parsedFadeColor})`
                            }}
                        />
                    </>
                )}
            </div> */}
        </div>
    );
};
export default TrustedCompanies;
