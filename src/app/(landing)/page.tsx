import dynamic from 'next/dynamic';
import { type Metadata } from 'next';
import Badge from '@/components/Badge';
import Container from '@/components/Container';
import Header from '@/layout/components/Header';
import GoogleSchema from '@/components/GoogleSchema';
import LazySection from '@/components/LazySection';
import { type Graph } from 'schema-dts';

//* Dynamic imports -------------------
const Faqs = dynamic(() => import('@landing/components/Faqs'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const Infos = dynamic(() => import('@landing/components/infos'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const Reviews = dynamic(() => import('@landing/components/reviews'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const ApiCode = dynamic(() => import('@landing/components/ApiCode'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const Features = dynamic(() => import('@landing/components/features'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const Integration = dynamic(() => import('@landing/components/Integration'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const ProcessOverview = dynamic(() => import('@landing/components/processOverview'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});
const TrustedCompanies = dynamic(() => import('@landing/components/TrustedCompanies'), {
    loading: () => <div className='h-32 animate-pulse rounded-lg bg-gray-100' />
});
const ReverseEmailLookup = dynamic(() => import('@landing/components/forms/reverseEmailLookup'), {
    loading: () => <div className='h-96 animate-pulse rounded-lg bg-gray-100' />
});

//* Metadata --------------------------
export const metadata: Metadata = {
    title: 'Reverse Email Lookup | Find Person & Company Info from Email Instantly',
    description:
        'Use ReverseEmailLookup.net to discover full B2B data from any email address. Get name, job title, company, LinkedIn profile & more. Supports bulk & API lookups. Try now!',
    alternates: {
        canonical: '/'
    }
};

//* Google Schema ---------------------
const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Corporation',
            address: {
                '@type': 'PostalAddress',
                addressCountry: {
                    '@type': 'Country',
                    name: 'United Arab Emirates'
                },
                addressLocality: 'Dubai, United Arab Emirates',
                postalCode: '1983',
                streetAddress: '1983, HUB SPOTBUSINESS BAYNA, Dubai, UAE'
            },
            alternateName: ['Reverse Email Lookup'],
            contactPoint: {
                '@type': 'ContactPoint',
                areaServed: 'UAE',
                availableLanguage: 'English',
                contactType: 'customer service',
                telephone: '+9795684215'
            },
            description:
                'ReverseEmailLookup.net is a data enrichment and lead intelligence platform that provides reverse email lookup services with seamless CRM integration, a Google Sheets™ add-on, and a powerful API. By entering any email address, users can instantly uncover detailed person and company information such as full names, job titles, organizations, and social profiles. Businesses use ReverseEmailLookup.net to enhance CRM records, verify leads, enrich contact databases, and streamline sales and marketing workflows with accurate, real-time insights.',
            email: 'info@reverseemaillookup.net',
            founders: [
                {
                    '@type': 'Person',
                    image: 'https://media.licdn.com/dms/image/C4D03AQG3yAimmRs8Yw/profile-displayphoto-shrink_800_800/0/1624959985231?e=1725494400&v=beta&t=fDw0wSsHrnugXMR6H7IRGvc_BTPvSdft0czLA3NQEsM',
                    jobTitle: 'Founder & Chief Executive Officer',
                    name: 'Seyyed Mohammad Razavi',
                    sameAs: ['www.linkedin.com/in/seyyed-mohammad-razavi', 'https://x.com/seyyed_razavi']
                }
            ],
            legalName: 'CUFINDER COMPUTER SYSTEMS & COMMUNICATION EQUIPMENT SOFTWARE TRADING CO. L.L.C',
            logo: 'https://reverseemaillookup.net/imgs/logos/logo.png',
            name: 'Reverse Email Lookup',
            sameAs: [
                'https://www.linkedin.com/company/reverse-email-lookup/',
                'https://www.instagram.com/reverseemaillookup/',
                'https://x.com/reverseemailnet',
                'https://facebook.com/reverseemaillookup',
                'https://www.youtube.com/@ReverseEmailLookup',
                'https://www.g2.com/products/reverse-email-lookup/reviews',
                'https://www.producthunt.com/products/reverse-email-lookup',
                'https://www.saashub.com/reverse-email-lookup'
            ],
            url: 'https://reverseemaillookup.net/'
        },
        {
            '@type': 'WebSite',
            name: 'Reverse Email Lookup',
            url: 'https://reverseemaillookup.net'
        }
    ]
};

//* Data ------------------------------
const headerBadgesData = ['Bulk search', 'High accuracy', 'Fast lookup'];

//* Component -------------------------
const HomePage = () => {
    return (
        <div>
            <GoogleSchema jsonLd={jsonLd} />
            <Header
                title='Reverse Email Lookup – Find Person & Company Information from Any Email'
                titleClassName='!max-w-200'
                description='ReverseEmailLookup.net helps you instantly uncover detailed insights from any email address — including full names, job titles, companies, and social profiles. With powerful API access, seamless CRM integration, and a Google Sheets™ add-on, you can enrich contacts, verify leads, and keep your data accurate across all your sales and marketing tools.'
                descriptionClassName='!max-w-215'
                topChildren={
                    <ul className='flex items-center justify-center gap-1'>
                        {headerBadgesData.map((text) => (
                            <li key={text}>
                                <Badge text={text} size='sm' icon='icon-park-solid:check-one' color='warning-dark5' />
                            </li>
                        ))}
                    </ul>
                }
                bottomChildren={
                    <>
                        <ReverseEmailLookup className='mt-16' />
                        <TrustedCompanies className='mt-7' />
                    </>
                }
            />
            <LazySection>
                <Container>
                    <section className='mt-24'>
                        <Infos title='How Reverse Email Lookup Can Work for You' />
                    </section>
                </Container>
            </LazySection>
            <LazySection>
                <section className='tablet:mt-32 mt-24'>
                    <Reviews />
                </section>
            </LazySection>
            {/* for shadow card overflow visible */}
            <LazySection>
                <Container className='!overflow-visible'>
                    <section className='tablet:mt-32 mt-24'>
                        <Features
                            badgeText='Our Values'
                            badgeColor='pastelPink-dark4'
                            title='Why Choose Us'
                            description='Find real-time contact and company data from an email address.'
                        />
                    </section>
                </Container>
            </LazySection>
            <LazySection>
                <section className='tablet:mt-32 mt-24'>
                    <ApiCode descriptionClassName='font-bold' />
                </section>
            </LazySection>
            <LazySection>
                <Container>
                    <section className='tablet:mt-32 mt-24'>
                        <Integration />
                    </section>
                </Container>
            </LazySection>
            <LazySection>
                <Container>
                    <section className='tablet:mt-32 mt-24'>
                        <ProcessOverview />
                    </section>
                </Container>
            </LazySection>
            <LazySection>
                <section className='tablet:mt-32 mt-24'>
                    <Faqs />
                </section>
            </LazySection>
        </div>
    );
};

export default HomePage;
