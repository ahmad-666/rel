'use client';

import Icon from '@/components/Icon';
import { CSSProperties, ReactNode } from 'react';
import useColor from '@/hooks/useColor';

//* Types -----------------------------
export type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeProps = {
    text: string;
    icon?: string;
    color: string;
    size?: BadgeSize;
    variant?: 'outline' | 'fill';
    children?: ReactNode;
    textClassName?: string;
    className?: string;
};

//* Component -------------------------
const Badge = ({
    text,
    icon,
    color,
    size = 'md',
    variant = 'fill',
    children,
    textClassName = '',
    className
}: BadgeProps) => {
    const parsedColor = useColor(color);

    // Extract base color name for text color (e.g., 'primary-light1' -> 'primary')
    const getBaseColorName = (colorInput: string) => {
        const colorSplitter = colorInput.includes('.') ? '.' : '-';
        const colorSplit = colorInput.split(colorSplitter);
        return colorSplit[0];
    };

    const baseColorName = getBaseColorName(color);
    const bgColor = useColor(`${baseColorName}-light5`);
    const borderColor = useColor(`${baseColorName}-light3`);
    const textColor = useColor(color);

    const cssClasses = {
        outlineVariant: 'bg-transparent text-(--color) border border-solid ',
        fillVariant: 'text-(--color)',
        roundedSize: `rounded-full border border-solid  ${children ? 'py-1 pl-1 pr-3' : 'py-0.5'} ${size === 'sm' ? 'px-1  min-h-4' : ''} ${size === 'md' ? 'px-2 min-h-5' : ''} ${size === 'lg' ? 'px-3 min-h-6' : ''}`,
        textStyle: `capitalize font-semibold ${size == 'sm' ? 'text-label-sm ' : 'text-label-md'}`
    };

    return (
        <div
            className={`inline-flex items-center gap-1 ${cssClasses.roundedSize} ${variant === 'outline' ? cssClasses.outlineVariant : cssClasses.fillVariant} ${className}`}
            style={
                {
                    '--color': parsedColor,
                    '--text-color': textColor,
                    '--color-light': `color-mix(in srgb,${parsedColor},white 15%)`,
                    '--color-dark': `color-mix(in srgb,${parsedColor},black 15%)`,
                    ...(variant === 'fill' && { backgroundColor: bgColor, borderColor: borderColor }),
                    ...(variant === 'outline' && { borderColor: borderColor, backgroundColor: 'transparent' })
                } as CSSProperties
            }
        >
            {children}
            {icon && <Icon icon={icon} size={size === 'sm' ? 'xs' : size === 'md' ? 'md' : 'lg'} color={textColor} />}
            <p className={`${cssClasses.textStyle} ${textClassName}`} style={{ color: textColor }}>
                {text}
            </p>
        </div>
    );
};

export default Badge;
