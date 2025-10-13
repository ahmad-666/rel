'use client';

import { Icon as Iconify, type IconProps } from '@iconify/react';
import useColor from '@/hooks/useColor';

export type Size = 'xs' | 'sm' | '2sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | number;
type Props = IconProps & {
    size?: Size;
    className?: string;
};

export default function Icon({ icon, size = 'md', color = 'primary', style, className = '', ...rest }: Props) {
    const parsedColor = useColor(color);
    const getSize = () => {
        let s = 0;
        switch (size) {
            case 'xs':
                s = 14;
                break;
            case 'sm':
                s = 18;
                break;
            case '2sm':
                s = 21;
                break;
            case 'md':
                s = 24;
                break;
            case 'lg':
                s = 30;
                break;
            case 'xl':
                s = 38;
                break;
            case '2xl':
                s = 45;
                break;
            case '3xl':
                s = 55;
                break;
            case '4xl':
                s = 65;
                break;
            case '5xl':
                s = 75;
                break;
            default:
                s = size;
                break;
        }
        return s;
    };
    const iconSize = getSize();

    return (
        <Iconify
            icon={icon}
            fontSize={iconSize}
            color={parsedColor}
            className={`${className}`}
            style={{
                //* add bot className,style so we have supports for both tailwind,mui
                display: 'inline-block',
                pointerEvents: 'none',
                ...style
            }}
            {...rest}
        />
    );
}

//? If we want border around icons:
// #1:
//     <div className='shadow-[0_0_0_2px_white_inset] inline-flex aspect-square items-center justify-center p-0 rounded-circle'>
//         <Icon icon="mdi:check-circle" color="success" />
//     </div>
// #2:
//     <div className='border border-white border-2 bg-success inline-flex aspect-square items-center justify-center p-0 rounded-circle'>
//     <Icon icon="mdi:circle" color='white' />
//     </div>
