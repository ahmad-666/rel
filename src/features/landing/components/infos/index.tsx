'use client';

import { type ReactNode } from 'react';
import Badge from '@/components/Badge';
import InfoCard from '@landing/components/infos/InfoCard';
import { type InfoItem } from '@landing/types';

//* Types -----------------------------
type Props = {
    title: string;
    description?: ReactNode;
    infoCards?: InfoItem[];
    className?: string;
    titleClassName?: string;
    infoCardsClassName?: string;
    descriptionClassName?: string;
};

// * constants -----------------------------
const defaultInfoCards: InfoItem[] = [
    {
        title: 'Find Contact Details in Google Sheets',
        description: 'Reverse Email Lookup helps you turn a single email address into a complete contact profile',
        imageSrc: '/imgs/home/google-sheet.png',
        imageClassName: 'max-w-[550px]',
        descriptionClassName: 'max-w-[340px]',
        btnText: 'Get the free add-on',
        btnHref: 'https://workspace.google.com/marketplace/app/reverse_email_lookup/842624082347',
        layout: 'row',
        boxedImage: false
    },
    {
        title: 'Bulk Search',
        description: 'You can upload any number of emails.',
        imageSrc: '/imgs/home/xlsx-cvs.png',
        className: 'col-span-2 bg-info-light2'
    },
    {
        title: 'Find Verified Owner Details from Any Email',
        description: 'Find real-time contact and company data from an email address.',
        imageSrc: '/imgs/home/owner-details.png',
        className: 'col-span-3 bg-warning-light2'
    }
];

//* Component --------------------
const Infos = ({
    title,
    description,
    infoCards = defaultInfoCards,
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    return (
        <div className={`mx-auto max-w-[1120px] ${className}`}>
            <div className='laptop:w-fit mx-auto w-full text-center'>
                <Badge text='What We Do' color='info-dark4' />
                <h2 id='infos-title' className={`text-headline-lg text-neutral-dark4 mt-3 ${titleClassName}`}>
                    {title}
                </h2>
                {!!description && (
                    <p className={`text-body-md text-neutral mt-8 ${descriptionClassName}`}>{description}</p>
                )}
            </div>
            <ul className='tablet:flex-row mt-10 grid grid-cols-5 gap-3'>
                <li className='col-span-5'>
                    <InfoCard {...infoCards[0]} className='bg-success-light2' />
                </li>
                {infoCards.slice(1).map((card, index) => {
                    const colClass = index % 2 === 0 ? 'col-span-5 tablet:col-span-2' : 'col-span-5 tablet:col-span-3';
                    const bgColorClass = index % 2 === 0 ? 'bg-info-light2' : 'bg-warning-light2';
                    return (
                        <li key={card.title} className={`${colClass} h-full`}>
                            <InfoCard {...card} className={`${bgColorClass}`} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Infos;
