import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TrustedCompanies from '@landing/components/TrustedCompanies';

type Props = BoxProps & {};

export default function AuthLayout({ children, ...rest }: Props) {
    return (
        <Box
            sx={{
                background: 'url("/imgs/patterns/grid-layers.png") no-repeat center center / contain',
                bgcolor: 'primary.light5'
            }}
            {...rest}
        >
            <main>
                <Stack minHeight='85vh' direction='column' justifyContent='center' alignItems='center'>
                    {children}
                </Stack>
            </main>
            <Box mt={10} mx='auto' width={{ mobile: 1, tablet: 3 / 4 }}>
                <TrustedCompanies cloneCount={3} />
            </Box>
        </Box>
    );
}
