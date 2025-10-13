'use client';

import { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
    children: React.ReactNode;
    className?: string;
    rootMargin?: string;
    threshold?: number;
}

const LazySection = ({ children, className = '', rootMargin = '100px', threshold = 0.1 }: LazySectionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin, threshold]);

    return (
        <div ref={ref} className={className}>
            {isVisible ? children : <div className='h-96 animate-pulse rounded-lg bg-gray-100' />}
        </div>
    );
};

export default LazySection;
