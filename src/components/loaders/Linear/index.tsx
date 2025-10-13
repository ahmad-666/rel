'use client';

import useColor from '@/hooks/useColor';

type LinearLoaderProps = {
    value?: number;
    color?: string;
    size?: number;
    animate?: boolean;
    loaderClassName?: string;
    className?: string;
};

export default function LinearLoader({
    value, //in percent [0,100]
    color = 'primary',
    size = 5,
    animate = false,
    loaderClassName = '',
    className = ''
}: LinearLoaderProps) {
    const parsedColor = useColor(color);

    return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${size}px` }}>
            <div
                className={`absolute left-0 top-0 h-full w-full origin-left ${animate ? 'animate-linear-progress' : ''} ${loaderClassName}`}
                style={{ width: value ? `${value}%` : '100%', backgroundColor: parsedColor }}
            ></div>
        </div>
    );
}
