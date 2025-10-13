import Box, { type BoxProps } from '@mui/material/Box';

type ColorStop = {
    color: string;
    startDegree?: number;
    endDegree?: number;
};
type Props = BoxProps & {
    /** array of color-stops for conic-gradient */
    colors: ColorStop[];
    /** gradient color rotation */
    rotation?: number;
    /** will act as both gradient blur and gradient spread */
    blur?: number;
};

export default function GradientShadow({
    colors = [],
    rotation = 0,
    blur = 5,
    bgcolor = 'white',
    children,
    ...rest
}: Props) {
    return (
        <Box overflow='visible' position='relative' zIndex={1} {...rest}>
            <Box
                position='absolute'
                left={0}
                top={0}
                width={1}
                height={1}
                zIndex={-1}
                borderRadius='inherit'
                sx={{
                    filter: `blur(${blur}px)`,
                    backgroundImage: `conic-gradient(from ${rotation}deg, ${colors.map((colorStop) => `${colorStop.color} ${typeof colorStop.startDegree === 'number' ? `${colorStop.startDegree}deg` : ''} ${typeof colorStop.endDegree === 'number' ? `${colorStop.endDegree}deg` : ''}`).join(', ')})`
                }}
            />
            <Box width={1} height={1} bgcolor={bgcolor} borderRadius='inherit'>
                {children}
            </Box>
        </Box>
    );
}

//? Usage:
{
    /* <GradientShadow width={500} height={300} borderRadius={5} blur={5}
    colors={[
        { color: '#8ADFFF88', startDegree: 0, endDegree: 90 },
        { color: '#C274FF88', startDegree: 90, endDegree: 180 },
        { color: '#FF669A88', startDegree: 180, endDegree: 270 },
        { color: '#FBB23088', startDegree: 270, endDegree: 360 }
    ]}
    >
    <Box p={5}>...</Box>
</GradientShadow> */
}
