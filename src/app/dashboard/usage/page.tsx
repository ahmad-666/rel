import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@/components/Container/Mui';
import CreditUsage from '@dashboard/components/subscription/CreditUsage';

export const metadata: Metadata = {
    title: 'Credit Usage'
};

export default function DashboardUsagePage() {
    return (
        <Box mt={12}>
            <Typography ml={8} component='h1' variant='titleLg' color='neutral.dark4'>
                Usage
            </Typography>
            <Container mt={8} overflow='visible'>
                <CreditUsage />
            </Container>
        </Box>
    );
}
