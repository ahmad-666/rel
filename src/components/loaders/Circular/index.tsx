'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import useColor from '@/hooks/useColor';
import styles from './style.module.scss';

type CircularLoaderProps = {
    value?: number;
    color?: string;
    size?: number;
    thickness?: number;
    spaceOffset?: number;
    overflowOffset?: number;
    rotate?: number;
    animate?: boolean;
    children?: ReactNode;
    loaderClassName?: string;
    contentClassName?: string;
    className?: string;
};

export default function CircularLoader({
    value = 0, //percent of filled circle , [0,100]
    color = 'primary',
    size = 50, //total width,height of container
    thickness = 5, //stroke-width of loader
    spaceOffset = 0, //will be added as offset to stroke-dashoffset for add empty space,...
    overflowOffset = 0.1, //for preventing overflow
    rotate = 90, //for starting rotation
    animate = false,
    children,
    loaderClassName = '',
    contentClassName = '',
    className = ''
}: CircularLoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null!);
    const parsedColor = useColor(color);
    const radius = size / 2 - (overflowOffset * size) / 2; //we subtract some value(10%) from 'size/2' to prevent overflow
    const area = 2 * Math.PI * radius;
    useEffect(() => {
        const elm = containerRef.current;
        if (elm) {
            const areaDashValue = Math.round(area);
            const customDashValue = areaDashValue * (value / 100);
            elm.style.setProperty('--dash-value', `${customDashValue}px`);
            elm.style.setProperty('--animate-loader-offset', `${spaceOffset}px`);
            elm.style.setProperty('--animate-dash-value', `${areaDashValue}px`);
        }
    }, [value, area, spaceOffset]);
    return (
        <div
            ref={containerRef}
            className={`relative flex flex-col items-center justify-center overflow-hidden ${styles['circular-loader']} ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `rotate(${rotate}deg)`
            }}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox={`0 0 ${size} ${size}`}
                className={`absolute left-0 top-0 h-full w-full ${animate ? styles.animate : ''} ${loaderClassName}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    className={`origin-center ${animate ? styles.animate : ''}`}
                    style={{
                        fill: 'transparent',
                        stroke: parsedColor,
                        strokeWidth: `${thickness}px`,
                        strokeLinecap: 'round'
                    }}
                ></circle>
            </svg>
            {children && (
                <div
                    className={`${contentClassName}`}
                    style={{
                        transform: `rotate(-${rotate}deg)`
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

//* Overview
//we find circle area with --> 2*PI*r formula
//we set initial stroke-dasharray,stroke-dashoffset to circle area
//we animate stroke-dashoffset from circle area to 0
//(Optional) we add some offset value for add spacing and also we add rotation on svg itself
//* Tips
//stroke-dasharray property is used to add dashes of varying lengths to a stroke. It’s like border-style: dashed but much more powerful ... stroke-dasharray: 100 --> both stroke-length,gap is 100px
//stroke-dashoffset is used to shift the starting point of the dash.
//for center it we should just use 'mx-auto' css class
