'use client';

import { useRef, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import Carousel from '@/components/Carousel';
import PlanCard from '@landing/components/plan/PlanCard';
import DurationButtons from '@landing/components/plan/DurationButtons';
import useBreakpoints from '@/hooks/useBreakpoint';
import type { Swiper } from 'swiper/types';
import { DurationType, type PlanResponse } from '@landing/types/plan';

//* Types -----------------------------
type Props = {
    initialPlans?: PlanResponse[];
    className?: string;
};

//* Component -------------------------
const Plan = ({ initialPlans = [], className = '' }: Props) => {
    //* Hooks
    const { desktopAndLower } = useBreakpoints();

    //* States
    const [activeTab, setActiveTab] = useState<DurationType>(DurationType.MONTHLY);

    //* Refs
    const carouselRef = useRef<Swiper>(null!);

    //* Handlers
    const prevSlide = () => {
        carouselRef.current.slidePrev();
    };
    const nextSlide = () => {
        carouselRef.current.slideNext();
    };

    //* Data
    const MonthlyPlans = initialPlans?.filter((plan) => plan.period === DurationType.MONTHLY);
    const YearlyPlans = initialPlans?.filter((plan) => plan.period === DurationType.YEARLY);

    return (
        <div className={`${className}`}>
            {!initialPlans?.length ? (
                <div className='flex h-full w-full items-center justify-center'>
                    <p className='text-title-lg text-neutral-dark4'>Plans Not Found</p>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <DurationButtons value={activeTab} onChange={(newVal) => setActiveTab(newVal)} />
                    <div className='mt-8 w-full'>
                        {desktopAndLower && (
                            <div className='mb-4 flex items-center justify-around'>
                                <Button
                                    variant='outline'
                                    circular
                                    className='!h-8 !w-8 active:!min-h-8 active:!min-w-8'
                                    onClick={prevSlide}
                                >
                                    <Icon icon='mdi:chevron-left' />
                                </Button>
                                <Button
                                    variant='outline'
                                    circular
                                    className='!h-8 !w-8 active:!min-h-8 active:!min-w-8'
                                    onClick={nextSlide}
                                >
                                    <Icon icon='mdi:chevron-right' />
                                </Button>
                            </div>
                        )}
                        <Carousel
                            ref={carouselRef}
                            swiperClassName='plans-carousel'
                            slidesPerView='auto'
                            spaceBetween={8}
                            wrapperClass='flex max-w-fit mx-auto'
                        >
                            {activeTab === DurationType.MONTHLY &&
                                MonthlyPlans?.map((plan) => (
                                    <SwiperSlide key={plan.price_id} className='mobile:w-81 w-72 shrink-0 last:!mr-0'>
                                        <PlanCard {...plan} />
                                    </SwiperSlide>
                                ))}
                            {activeTab === DurationType.YEARLY &&
                                YearlyPlans?.map((plan) => (
                                    <SwiperSlide key={plan.price_id} className='mobile:w-81 w-72 shrink-0 last:!mr-0'>
                                        <PlanCard {...plan} />
                                    </SwiperSlide>
                                ))}
                        </Carousel>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Plan;
