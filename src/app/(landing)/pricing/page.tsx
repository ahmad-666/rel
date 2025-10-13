import dynamic from 'next/dynamic';
import { type Metadata } from 'next';
import Header from '@/layout/components/Header';
import { getPlans } from '@landing/services/plans';
import { type PlanResponse } from '@landing/types/plan';

//* Dynamic imports -------------------
const Faqs = dynamic(() => import('@landing/components/Faqs'));
const Plan = dynamic(() => import('@landing/components/plan'));
const Reviews = dynamic(() => import('@landing/components/reviews'));
const TrustedCompanies = dynamic(() => import('@landing/components/TrustedCompanies'));
const PlanSpecialCard = dynamic(() => import('@landing/components/plan/PlanSpecialCard'));

//* Metadata -------------------------
export const metadata: Metadata = {
    title: 'Pricing | Reverse Email Lookup',
    description:
        'Choose from flexible pricing plans for Reverse Email Lookup. Affordable options for single lookups, bulk requests, and API access. No hidden fees—start today.',
    alternates: {
        canonical: '/pricing'
    }
};

//* Component -------------------------
const PricingPage = async () => {
    let plans: PlanResponse[] = [];
    try {
        plans = await getPlans();
    } catch (err) {}

    return (
        <div>
            <Header
                title='Select the right plan for your business.'
                bottomChildren={
                    <>
                        <Plan className='tablet:mt-16 mt-8' initialPlans={plans} />
                        <TrustedCompanies className='mt-16' />
                        <PlanSpecialCard className={`mt-12 w-full`} />
                    </>
                }
                className='!pt-36'
                titleClassName='!max-w-[600px] text-display-sm'
            />
            <section className='tablet:mt-32 mt-24'>
                <Reviews className='bg-transparent !py-0' />
            </section>
            <section className='tablet:mt-32 mt-24'>
                <Faqs />
            </section>
        </div>
    );
};

export default PricingPage;
