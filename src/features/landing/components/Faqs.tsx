'use client';

import { useState, type ComponentProps } from 'react';
import Container from '@/components/Container';
import Badge from '@/components/Badge';
import Faq from '@landing/components/Faq';

//* Types -----------------------------
type Props = {
    type?: 'string' | 'jsx';
    title?: string;
    label?: string;
    faqs?: Pick<ComponentProps<typeof Faq>, 'question' | 'answer'>[];
    className?: string;
    titleClassName?: string;
    labelClassName?: string;
    questionClassName?: string;
    answerClassName?: string;
};

//* Constants -------------------------
const defaultFaqs = [
    {
        question: 'What is Reverse Email Lookup?',
        answer: (
            <>
                <span className='tex font-bold'>Reverse Email Lookup</span> is a service that lets you find detailed
                information about a person or business by simply entering their email address. It can return name, job
                title, company, LinkedIn profile, and more.
            </>
        )
    },
    {
        question: 'Is Reverse Email Lookup legal?',
        answer: 'Yes, using Reverse Email Lookup is legal when used for lawful purposes such as lead generation, recruitment, or fraud detection. We are compliant with GDPR and CCPA regulations.'
    },
    {
        question: 'What kind of data can I get from an email?',
        answer: 'You can receive information such as full name, job title, company name, domain, location, social profiles (like LinkedIn), and additional professional metadata.'
    },
    {
        question: 'Do you offer a Reverse Email Lookup API?',
        answer: 'Yes! We provide a powerful API for developers that supports real-time lookups and bulk data enrichment. You can easily integrate it into your CRM or lead generation systems.'
    },
    {
        question: 'Can I upload a list of emails for bulk lookup?',
        answer: 'Absolutely. Our bulk lookup feature allows you to upload CSV files with thousands of emails and receive enriched B2B data in minutes.'
    },
    {
        question: 'How accurate is the data you provide?',
        answer: 'Our database is constantly updated and enriched using verified public sources, corporate records, and partnerships. While no tool is 100% perfect, we strive for high accuracy and coverage.'
    },
    {
        question: 'Is there a free trial available?',
        answer: 'Yes, we offer a limited number of free lookups so you can test the service before committing to a paid plan.'
    },
    {
        question: 'How do you protect my data?',
        answer: 'We use industry-standard encryption, secure servers, and never share your queries with third parties. You are in control of your data at all times.'
    }
];

//* Component -------------------------
const Faqs = ({
    type = 'string',
    title = 'Frequently Asked Questions',
    label,
    faqs = defaultFaqs,
    titleClassName = '',
    labelClassName = '',
    questionClassName = '',
    answerClassName = '',
    className = ''
}: Props) => {
    const [activeFaq, setActiveFaq] = useState(0);
    const handleFaqChange = (index: number, newVal: boolean) => {
        if (newVal) setActiveFaq(index);
        else setActiveFaq(-1);
    };
    return (
        <div className={`bg-neutral-light5 ${className}`}>
            <Container size='md' className='py-16'>
                <div className='laptop:flex-row laptop:items-center flex flex-col items-start gap-x-32 gap-y-14'>
                    <div className='flex shrink-0 flex-col items-start'>
                        <Badge text='FAQ' color='warning-dark5' />
                        {!!label && <p className={`text-body-md text-neutral mt-2 ${labelClassName}`}>{label}</p>}
                        <h2
                            className={`text-headline-lg text-neutral-dark4 laptop:max-w-72 mt-2 text-start ${titleClassName}`}
                        >
                            {title}
                        </h2>
                    </div>
                    <ul className='flex w-full flex-col gap-y-3'>
                        {faqs.map((faq, i) => (
                            <li
                                key={i}
                                className='border-neutral-light2 shrink-0 rounded-xl border border-solid bg-white px-5 py-4'
                            >
                                <Faq
                                    type={type}
                                    show={i === activeFaq}
                                    onChange={(newVal) => handleFaqChange(i, newVal)}
                                    questionClassName={questionClassName}
                                    answerClassName={answerClassName}
                                    {...faq}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </div>
    );
};

export default Faqs;
