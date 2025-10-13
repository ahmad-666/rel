'use client';

import { useRef, useEffect, useMemo, useCallback, type CSSProperties, type ReactNode } from 'react';
import useResize from '@/hooks/useResize';
import styles from './styles.module.scss';

export type Props<T> = {
    /** reverse animation direction to RTL(default is LTR) */
    reverse?: boolean;
    /** totally disable animation */
    disable?: boolean;
    /** stop animation on hover */
    stopOnHover?: boolean;
    /** how many times we duplicate 'slides' prop */
    cloneCount?: number;
    /** space between each slides(padding in px) */
    space?: number;
    /** animation duration in ms ... we can relate it to slides.length e.g (slides.length*1000) */
    speed?: number;
    /** array of slides that we want to show ... can be any array ... size of slide can be dynamic too */
    slides: T[];
    children: (slide: T) => ReactNode;
    slideClassName?: string;
    className?: string;
};

const AutoPlaySlider = <T,>({
    reverse = false,
    disable = false,
    stopOnHover = false,
    cloneCount = 2,
    space = 20,
    speed = 5000,
    slides = [],
    children,
    slideClassName = '',
    className = ''
}: Props<T>) => {
    const slider = useRef<HTMLDivElement>(null!);
    const lastSlide = useRef<HTMLDivElement>(null!);
    const resize = useResize(lastSlide); //use resize observer to re-calculate sizing
    const clonedSlides = useMemo(() => {
        return new Array(cloneCount).fill(slides).flat();
    }, [slides, cloneCount]);
    const calcLoopPosition = useCallback(() => {
        //* calc position of each animation loop
        const originalSlides: HTMLDivElement[] = Array.from(slider.current.querySelectorAll('.slide.original'));
        const position = originalSlides.reduce((sum, slide) => sum + slide.offsetWidth, 0);
        slider.current.style.setProperty('--position', reverse ? `${position}px` : `-${position}px`);
    }, [reverse]);
    useEffect(() => {
        calcLoopPosition();
    }, [resize, calcLoopPosition]);

    return (
        <div
            ref={slider}
            className={`group overflow-hidden ${className}`}
            style={
                {
                    '--speed': `${speed}ms`
                } as CSSProperties
            }
        >
            <div
                className={`flex flex-nowrap items-center justify-start gap-0 ${reverse ? 'flex-row-reverse' : 'flex-row'} ${!disable ? styles['auto-play'] : ''} ${stopOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
            >
                {clonedSlides.map((slide, i) => {
                    const isDuplicate = i >= slides.length;
                    return (
                        <div
                            key={i}
                            ref={(node: null | HTMLDivElement) => {
                                if (node !== null && i === clonedSlides.length - 1) lastSlide.current = node;
                            }}
                            className={`slide shrink-0 ${isDuplicate ? 'duplicate' : 'original'} ${slideClassName}`}
                            style={{
                                padding: `0 ${space}px`
                            }}
                        >
                            {children(slide)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AutoPlaySlider;
