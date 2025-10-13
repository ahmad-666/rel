import Image from 'next/image';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import { numberFormatter } from '@/utils';

type Props = BoxProps & {
    title: string;
    description: string;
    imgSrc: string;
    credits: number;
    link: string;
};

export default function Card({ title, description, imgSrc, credits = 0, link, sx, ...rest }: Props) {
    return (
        <Box overflow='hidden' borderRadius={3} border={1} borderColor='neutral.light3' p={0} sx={{ ...sx }} {...rest}>
            <Box p={3}>
                <Image
                    src={imgSrc}
                    alt={title}
                    width={900}
                    height={900}
                    quality={90}
                    className='w-full rounded-lg object-cover'
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'left center',
                        height: '110px'
                    }}
                />
                <Typography mt={6} component='h3' variant='labelLg' color='neutral.dark4'>
                    {title}
                </Typography>
                <Typography mt={3} component='p' variant='bodyMd' color='neutral.main'>
                    {description}
                </Typography>
            </Box>
            <Stack
                mt={8}
                bgcolor='neutral.light4'
                justifyContent='space-between'
                alignItems='center'
                flexWrap='wrap'
                gap={4}
                borderTop={1}
                borderColor='neutral.light4'
                px={3}
                py={2}
            >
                <Stack alignItems='center' gap={1}>
                    <Image
                        src='/imgs/others/triangle.png'
                        alt='credits'
                        width={32}
                        height={32}
                        style={{
                            flexShrink: 0,
                            width: '25px'
                        }}
                    />
                    <Typography component='p' variant='labelLg' color='neutral.dark4'>
                        {numberFormatter(credits)} credits
                    </Typography>
                </Stack>
                <Button
                    href={link}
                    variant='contained'
                    color='neutral'
                    size='medium'
                    bgColor='neutral.dark4'
                    sx={{ px: 10 }}
                >
                    Start
                </Button>
            </Stack>
        </Box>
    );
}
