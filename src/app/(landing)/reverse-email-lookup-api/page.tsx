import dynamic from 'next/dynamic';
import { type Metadata } from 'next';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Header from '@/layout/components/Header';
import { type FeatureItem } from '@landing/types';

//* Dynamic imports -------------------
const Faqs = dynamic(() => import('@landing/components/Faqs'));
const ApiCode = dynamic(() => import('@landing/components/ApiCode'));
const Reviews = dynamic(() => import('@landing/components/reviews'));
const Features = dynamic(() => import('@landing/components/features'));
const ApiOverview = dynamic(() => import('@landing/components/ApiOverview'));
const TrustedCompanies = dynamic(() => import('@landing/components/TrustedCompanies'));

//* Metadata --------------------------
export const metadata: Metadata = {
    title: 'Reverse Email Lookup API | Enrich Emails with B2B Data Instantly',
    description:
        'Integrate our Reverse Email Lookup API to convert any email into full B2B profiles. Get names, job titles, companies, LinkedIn links & more—real-time & bulk.',
    alternates: {
        canonical: '/reverse-email-lookup-api'
    }
};

//* Data ------------------------------
const featuresItems: FeatureItem[] = [
    {
        title: 'Reliable Performance',
        description:
            'Handle high volumes of requests effortlessly, maintaining speed and reliability even under heavy loads.',
        imageSrc: '/imgs/other-pages/reverse-email-lookup-api/features-1.svg'
    },
    {
        title: 'Data Compliance',
        description:
            'Built to meet global standards like GDPR, CCPA, and SOC 2 Type II, ensuring your data remains secure and compliant.',
        imageSrc: '/imgs/other-pages/reverse-email-lookup-api/features-2.svg'
    },
    {
        title: 'Intuitive and User-Centric',
        description:
            'Developer-friendly structure, making implementation straightforward and minimizing integration challenges.',
        imageSrc: '/imgs/other-pages/reverse-email-lookup-api/features-3.svg'
    },
    {
        title: 'Real-Time Data Access',
        description: 'Access the freshest data instantly, empowering your applications with real-time insights.',
        imageSrc: '/imgs/other-pages/reverse-email-lookup-api/features-4.svg'
    }
];

//* Component -------------------------
const ApiPage = () => {
    return (
        <div>
            <Header
                title='Reverse Email Lookup API'
                description='Get detailed person and company data from just an email address. Instantly enrich your leads, verify users, and enhance your B2B tools with accurate, real-time results—available via simple API integration.'
                descriptionClassName='!max-w-[660px] mt-12'
                titleClassName='text-display-sm'
                className='!pt-36 !pb-16'
                bottomChildren={
                    <Button
                        href='/signup'
                        queryParams={{ cta_widget: 'api-page-hero' }}
                        variant='fill'
                        size='lg'
                        color='primary'
                        className='mt-8 shrink-0'
                    >
                        See Our API in Action
                    </Button>
                }
            />
            <Container>
                <section>
                    <TrustedCompanies fadeColor='white' />
                </section>
                <section className='mt-24'>
                    <ApiOverview
                        title='Reverse Email Lookup API – Power Your Platform with Smart Resolution'
                        description='Integrate our Reverse Email Lookup API to enhance your platform with smart identity resolution. Instantly turn email addresses into rich profiles—complete with names, job titles, and company data—so you can automate verification, enrich leads, and drive intelligent workflows.'
                        motionSrc='/imgs/other-pages/reverse-email-lookup-api/api-document.png'
                        layout='plain'
                    />
                </section>
            </Container>
            {/* for shadow card overflow visible */}
            <Container className='!overflow-visible'>
                <section className='tablet:mt-32 mt-24'>
                    <Features
                        title='Our APIs’ Features'
                        badgeText='Features'
                        badgeColor='pastelPink-dark1'
                        featuresCardsItems={featuresItems}
                        showButton={false}
                        showBadge={false}
                        layout='col'
                    />
                </section>
            </Container>
            <section className='tablet:mt-32 mt-24'>
                <ApiCode descriptionClassName='font-bold' />
            </section>
            <section className='tablet:mt-32 mt-24'>
                <Reviews className='bg-transparent !py-0' />
            </section>
            <section className='tablet:mt-32 mt-24'>
                <Faqs />
            </section>
        </div>
    );
};

export default ApiPage;
