'use client';

import Box, { type BoxProps } from '@mui/material/Box';
import useColor from '@/hooks/useColor';

type Props = Omit<BoxProps, 'borderRadius'> & {
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    strokeDasharray?: string;
    strokeDashoffset?: string;
};

export default function DashedBorder({
    borderWidth = 1,
    borderColor = 'neutral.main',
    borderRadius = 0,
    strokeDasharray = '10 5', //"10 5" means 10px border and 5px space and repeat it
    strokeDashoffset = '0',
    children,
    ...rest
}: Props) {
    const parsedBorderColor = useColor(borderColor);

    return (
        <Box overflow='hidden' position='relative' zIndex={1} borderRadius={`${borderRadius}px`} {...rest}>
            <svg
                width='100%'
                height='100%'
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0
                }}
            >
                <rect
                    x={0}
                    y={0}
                    width='100%'
                    height='100%'
                    fill='none'
                    strokeWidth={borderWidth}
                    stroke={parsedBorderColor}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    rx={borderRadius}
                    ry={borderRadius}
                />
            </svg>
            {children}
        </Box>
    );
}

//? Usage:
{
    /* <DashedBorder bgcolor="neutral.light4" width={500} borderWidth={5} borderColor='primary' borderRadius={10}
strokeDasharray='20 10' strokeDashoffset='0' >
    <Box bgcolor="transparent" p={5}></Box>
</DashedBorder> */
}
