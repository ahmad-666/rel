'use client';

import { useRef, forwardRef, type ComponentProps, type MutableRefObject, type ForwardedRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination, FreeMode, Autoplay, Scrollbar, Mousewheel } from 'swiper/modules';
// we have other modules like Controller,Thumbs,Mousewheel,Keyboard,ScrollBar,Virtual,Lazy,Parallax,Effects,...
//ScrollBar --> show scrollbar
//MouseWheel --> allow to change slide with mouse wheel
//Keyboard --> allow to interact with slider with keyboard
//Controller --> control another swiper slider with current swiper slider
import type { Swiper as SwiperType } from 'swiper/types';
//with SwiperOptions we have access to all options of swiper --> const b:Record<number,SwiperOptions> = {300:{slidesPerView:2}}
// import swiper styles inside global.scss file or root layout:
//app/layout.tsx: import 'swiper/css/bundle'
//also we create /public/styles/slider.scss file that we can add custom styles to it

type SwiperProps = Omit<ComponentProps<typeof Swiper>, 'ref' | 'modules' | 'className'>;
type CarouselProps = SwiperProps & {
    swiperClassName?: string;
    className?: string;
    //we have props like  width,height,autoHeight,autoplay,direction,draggable,simulateTouch,spaceBetween,slidesPerView,slidesPerGroup,autoplay,loop,loopAdditionalSlides,rewind,freeMode,speed,centeredSlides,centerInsufficientSlides,pagination,navigation,breakpoints,events,...,slideActiveClass,slidePrevClass,slideNextClass
    //we have events like:
    //onBeforeInit,onInit,onAfterInit,onBeforeDestroy,onDestroy
    //onClick,onResize,onUpdate,onSlidesUpdated
    //onActiveIndexChange,onRealIndexChange,onSliderMove,onBeforeSlideChangeStart,onSlideChange,onProgress,
    //onReachBeginning,onReachEnd
    //onBeforeTransitionStart,onTransitionStart,onTransitionEnd,onSlideChangeTransitionStart,onSlideChangeTransitionEnd
};

const Carousel = (
    {
        children,
        swiperClassName = '', //className of .swiper
        className = '', //className of top <div>
        // we have 'wrapperClass' prop too for add css class to .swiper-wrapper(e.g add padding-bottom for able to see shadow on slides)
        //we can define className prop on each <SwiperSlide /> too
        ...rest
    }: CarouselProps,
    ref?: ForwardedRef<SwiperType>
) => {
    const swiperRef = useRef<SwiperType>(null!);
    const onSwiperHandler = (swiper: SwiperType) => {
        if (swiper) {
            swiperRef.current = swiper;
            if (ref) (ref as MutableRefObject<SwiperType>).current = swiper;
        }
    };

    return (
        <div className={`${className}`}>
            <Swiper
                onSwiper={onSwiperHandler}
                modules={[Navigation, Pagination, FreeMode, Autoplay, Scrollbar, Mousewheel]}
                className={`${swiperClassName}`}
                {...rest}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default forwardRef(Carousel);

//* Tips:
//#1 for add classNames to different part of swiper:
//className prop for add className to top-container div
//swiperClassName prop for add className to swiper container(.swiper)
//wrapperClass prop for add className to slides container(.swiper-wrapper)
//we can use className prop on <SwiperSlide> for className to each slide(.swiper-slide)
//we have slideClass,slidePrevClass,slideNextClass props too
//#2 for sizing:
//by default each <SwiperSlider /> has width:100%
//if we use slidesPerView={5} then all <SwiperSlider />  will have equal width(20%)
//if we use slidesPerView="auto" and <SwiperSlider className="!w-[200px]" /> then all slides will have equal width(200px)
//if we use slidesPerView="auto" and <SwiperSlider className="!w-auto !max-w-[200px]" /> then each slide will have dynamic width base on its content(max is 200px)
//or we use slidesPerView="auto" and <SwiperSlider className="!w-[100px] !h-[100px] flex justify-center items-center"> <Image className="w-auto h-auto max-w-full max-h-full" /> </SwiperSlider>
//for static height we can set height prop and because of 'flex items-stretch' on .swiper-wrapper all slides will have same height ... or we can manually set css height on <SwiperSlide> or it's content
//for dynamic height we can use 'autoHeight' prop or 'h-auto' on <Swiper> and <SliderSlide> and because of 'flex items-stretch' on .swiper-wrapper all slides will have same height(biggest height of all slides)
//row-flexbox means width of flex-item is much as content and height of flex-item is stretch by default ... so if we place Swiper inside flex-item then width of flex-item will be much as content and content is swiper so we get infinite width and we should restrict width e.g by place <Swiper> inside <div> with manually set width:
{
    /* 
    <div className='flex flex-col tablet:flex-row'>
        <div> <Carousel className='w-full tablet:w-[400px]' /> </div>
        <div>...</div>
    </div> 
*/
}
//#3 for having visible shadow on slides or having outside pagination we add padding-bottom to .swiper or .swiper-wrapper
//if we have full shadow on both vertical and horizontal axis we can use: we can use negative or 0 value for 'spaceBetween' and instead of add padding to .swiper or .swiper-wrapper add padding to .swiper-slide:
{
    /* 
    <Carousel slidesPerView={3} spaceBetween={0}>
        <SwiperSlide className='!h-auto px-2.5 py-5'> <Card className='bg-white h-full shadow' /> </SwiperSlide>
    </Carousel> 
*/
}
//#4: by default we can't select text of swiper slides(but we can click on btn,links inside each slide) ... for enabling text selection we need to use '.swiper-no-swiping' on text nodes or use simulateTouch={false} prop which will disable dragging on non-touch devices
//#5: we should not use loop with rewind/centerSlides,...
//#6: if we get 'createContext' error when using swiper+next.js --> add 'use client' at top of component
//#7: for disable dragging in swiper --> allowTouchMove={false} simulateTouch={false} or use pointer-events-none on <Swiper> and pointer-events-auto on each .swiper-slide
//#8: for find out current/next/prev slide index,check if we reach start/end of slides , ... or manually move swiper we can use:
// import type { Swiper } from 'swiper/types';
// const swiper = useRef<Swiper>(null!);
// const prev = () => {swiper.current.slidePrev();};
// const next = () => {swiper.current.slideNext();};
// const onSlideChange = (swiper: Swiper) => {
//     //we have swiper.activeIndex,swiper.realIndex,swiper.isBeginning,swiper.isEnd,...
// };
// <Carousel ref={swiper} onSlideChange={onSlideChange} />
//#9: if we need auto sizing but we can't use slidesPerView='auto' then use slidesPerView={number} and use <div className="w-full h-full flex flex-col justify-center items-center"><Image className="w-auto h-auto max-w-full" /></div> on each slide.
//#10: for execute animation on active slide: use 'slideActiveClass' prop , onTransitionEnd event, use useIntersection on each slide component and do something when we intersect it.
//#11: for fix unstyle swiper on init render of ssr:
// const isClient = useClient()
// <Swiper className={isClient?'opacity-100':'opacity-0'} />
