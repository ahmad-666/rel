import dynamic from 'next/dynamic';
import { type Metadata } from 'next';
import Container from '@/components/Container';
import { type FeatureItem } from '@landing/types';
import Header from '@/layout/components/Header';

//* Dynamic imports -------------------
const Faqs = dynamic(() => import('@landing/components/Faqs'));
const Reviews = dynamic(() => import('@landing/components/reviews'));
const Features = dynamic(() => import('@landing/components/features'));
const Statistics = dynamic(() => import('@landing/components/Statistics'));
const StoryReview = dynamic(() => import('@landing/components/StoryReview'));
const TrustedCompanies = dynamic(() => import('@landing/components/TrustedCompanies'));

//* Metadata -------------------------
export const metadata: Metadata = {
    title: 'About Reverse Email Lookup | Our Mission to Power B2B Intelligence',
    description:
        'ReverseEmailLookup.net was built to help businesses unlock accurate B2B data from just an email address. Learn more about our mission, team, and technology.',
    alternates: {
        canonical: '/about-us'
    }
};

//* Data -----------------------------
const featuresItems: FeatureItem[] = [
    {
        title: 'Transparency',
        description: 'No hidden charges. No tricks. Just clear, fair pricing.',
        imageSrc: '/imgs/other-pages/about-us/feature-5.svg'
    },
    {
        title: 'Accuracy',
        description: 'We prioritize quality over quantity.',
        imageSrc: '/imgs/other-pages/about-us/feature-6.svg'
    },
    {
        title: 'Support',
        description: 'We’re a small team, and we treat our users like partners, not tickets.',
        imageSrc: '/imgs/other-pages/about-us/feature-7.svg'
    },
    {
        title: 'Privacy-First',
        description: 'Your searches are private — always. ',
        imageSrc: '/imgs/other-pages/about-us/feature-4.svg'
    }
];

//* Component -------------------------
const AboutUsPage = () => {
    return (
        <div>
            <Header
                title='We Make Contact Data Simple, Fair, and Accessible.'
                titleClassName='text-display-sm !max-w-[700px]'
                className='!pt-36 !pb-16'
                bottomChildren={<Statistics className='mt-12' />}
            />
            <Container>
                <section>
                    <TrustedCompanies fadeColor='white' />
                </section>
            </Container>
            <Container>
                <section className='tablet:mt-32 mt-10'>
                    <StoryReview />
                </section>
            </Container>
            {/* for shadow card overflow visible */}
            <Container className='!overflow-visible'>
                <section className='tablet:mt-32 mt-24'>
                    <Features
                        title='Our Values'
                        badgeText='About Our Values'
                        badgeColor='pastelPink-dark1'
                        layout='col'
                        showButton={false}
                        className='bg-neutral-light5 mobile:px-9 mobile:py-16 rounded-xl px-4 py-10'
                        showBadge={false}
                        featuresCardsItems={featuresItems}
                    />
                </section>
            </Container>
            <section className='tablet:mt-32 mt-24'>
                <Reviews className='bg-transparent !p-0' />
            </section>
            <section className='tablet:mt-32 mt-24'>
                <Faqs />
            </section>
        </div>
    );
};

export default AboutUsPage;
