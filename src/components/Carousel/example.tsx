import { useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import type {
    Swiper
    //  SwiperOptions
} from 'swiper/types';
import Button from '@/components/Button';
import Carousel from '.';

// type Breakpoint = Record<number, SwiperOptions>;
// const breakpoints: Breakpoint = {
//     //* we have 'SwiperOptions' type too
//     300: {
//         slidesPerView: 2,
//         spaceBetween: 20
//     }
// };

export default function CarouselExample() {
    const carouselRef = useRef<Swiper>(null!);
    const prevSlide = () => {
        carouselRef.current.slidePrev();
    };
    const nextSlide = () => {
        carouselRef.current.slideNext();
    };

    return (
        <div>
            <div>
                <h1>#1: Swiper with ref/loop/breakpoints/prev,next navigation/pagination</h1>
                <Button variant='fill' size='sm' circular className='shadow' onClick={prevSlide}>
                    prev
                </Button>
                <Button variant='fill' size='sm' circular className='shadow' onClick={nextSlide}>
                    next
                </Button>
                <Carousel
                    ref={carouselRef}
                    loop
                    spaceBetween={15}
                    slidesPerView={1}
                    pagination={{
                        enabled: true,
                        type: 'bullets',
                        clickable: true,
                        dynamicBullets: false,
                        bulletActiveClass: '!bg-primary !scale-[1.2]',
                        bulletClass: 'w-2 me-1 rounded-circle aspect-square inline-block cursor-pointer bg-slate-300'
                    }}
                    breakpoints={{
                        500: {
                            slidesPerView: 2
                        },
                        1000: {
                            slidesPerView: 3
                        }
                    }}
                    // swiperClassName='' //.swiper
                    wrapperClass='!pb-8' //.swiper-wrapper
                    className='mt-8' //container <div>
                >
                    {[...new Array(20)].map((_, i) => (
                        <SwiperSlide
                            key={i}
                            className='text-body-lg flex flex-col items-center justify-center rounded bg-blue-500 p-5 text-white'
                        >
                            <p>text</p>
                        </SwiperSlide>
                    ))}
                </Carousel>
            </div>
            <div>
                <h1>
                    #2: autoplay swiper + manual sizing on .swiper-slide with center flexbox and auto size image ...
                </h1>
                {
                    //? if we see autoplay not take effect maybe we should remove ClientOnly if we use it.
                    //? if we see autoplay not take effect maybe we should increase total number of slides to autoplay actually playing
                }
                {
                    //! for auto-slider each slide must have equal width else we see wrong slide change movement because if we want to change slide in 2s and one slide is 200px and another is 400px then each will take different time to move.
                }
                {
                    //* we have /components/common/AutoSlider component too which will use pure-css approach
                }
                <Carousel
                    loop
                    loopAdditionalSlides={3}
                    rewind={false}
                    draggable={false}
                    centeredSlides={false}
                    spaceBetween={50}
                    slidesPerView={5}
                    speed={2000} //higher value means slower speed
                    autoplay={{
                        delay: 0, //if 'delay' is not specified then 'autoplay' will be disabled , this is delay after each swiper slide change transition
                        disableOnInteraction: false, //disable autoplay if user interacts(swiper) carousel
                        pauseOnMouseEnter: false, //pause autoplay when mouse enters carousel box
                        reverseDirection: false, //reverse direction when reach end
                        stopOnLastSlide: false, //stop autoplay if react end
                        waitForTransition: true //if true autoplay will be stopped until transition finishes
                    }}
                    wrapperClass='pointer-events-none !ease-linear'
                >
                    {[...new Array(50)].map((_, i) => (
                        <SwiperSlide
                            key={i}
                            className='flex flex-col items-center justify-center bg-blue-500 p-5 text-white'
                        >
                            {/* <Image className="w-auto h-auto max-w-full" /> */}
                            {i + 1}
                        </SwiperSlide>
                    ))}
                </Carousel>
            </div>
            <div>
                <h1>#3: Vertical slider + ScrollBar + MouseWheel</h1>
                <Carousel
                    loop={false}
                    slidesPerView={5}
                    spaceBetween={0}
                    slidesPerGroup={3} //how many slides should passed when user scrolls
                    direction='vertical'
                    mousewheel={{
                        enabled: true
                        // eventsTarget: '.css-selector',invert:false,sensitivity:1,thresholdDelta: undefined,
                    }}
                    scrollbar={{
                        enabled: true,
                        draggable: true,
                        hide: false, //hide scrollbar after interaction
                        snapOnRelease: true,
                        // horizontalClass: 'custom-swiper-horizontal-scrollbar',
                        verticalClass: 'custom-swiper-vertical-scrollbar'
                        // .custom-swiper-horizontal-scrollbar {
                        //     @apply overflow-hidden rounded bg-primary;
                        //     height: 10px !important;
                        //     .swiper-scrollbar-drag {@apply h-full rounded bg-white;}
                        // }
                        // .custom-swiper-vertical-scrollbar {
                        //     @apply overflow-hidden rounded bg-primary;
                        //     width: 10px !important;
                        //     .swiper-scrollbar-drag {@apply w-full rounded bg-white;}
                        // }
                        // horizontalClass,verticalClass,dragClass,lockClass,horizontalClass,verticalClass,scrollbarDisabledClass,dragSize
                    }}
                    swiperClassName='h-auto max-h-[300px] px-4' //overflow-hidden is on .swiper so we use height,max-height on it + we use padding on x-axis to prevent collision of swiper slides with scrollbar
                    className='border border-solid p-5'
                >
                    {[...new Array(20)].map((_, i) => (
                        <SwiperSlide key={i} className='py-5 first:pt-0 last:pb-0'>
                            <div className='flex flex-col items-center justify-center bg-blue-500 p-5 text-white'>
                                {i + 1}
                            </div>
                        </SwiperSlide>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
