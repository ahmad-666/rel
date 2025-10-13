import Box, { type BoxProps } from '@mui/material/Box';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string;
type Props = BoxProps & {
    /**
     * 'xs' --> 600px
     *
     * 'sm' --> 720px
     *
     * 'md' --> 1000px
     *
     * 'lg' --> 1300px
     *
     * 'xl' --> 1600px
     */
    size?: Size;
};

export default function Container({ size = 'md', children, ...rest }: Props) {
    const getSize = () => {
        let width;
        let maxWidth;
        switch (size) {
            case 'xs':
                width = 600;
                maxWidth = '90%';
                break;
            case 'sm':
                width = 720;
                maxWidth = '92%';
                break;
            case 'md':
                width = 1000;
                maxWidth = '94%';
                break;
            case 'lg':
                width = 1300;
                maxWidth = '94%';
                break;
            case 'xl':
                width = 1600;
                maxWidth = '94%';
                break;
            default:
                width = size;
                maxWidth = '94%';
        }
        return { width, maxWidth };
    };
    const { width, maxWidth } = getSize();

    return (
        <Box {...rest} mx='auto' width={width} maxWidth={maxWidth}>
            {children}
        </Box>
    );
}
