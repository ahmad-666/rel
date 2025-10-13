import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@/components/Container/Mui';
import ActiveSubscription from '@dashboard/components/subscription';

export const metadata: Metadata = {
    title: 'Subscription'
};

export default function DashboardSubscriptionPage() {
    return (
        <Box mt={12}>
            <Typography ml={8} component='h1' variant='titleLg' color='neutral.dark4'>
                Subscription
            </Typography>
            <Container mt={15}>
                <ActiveSubscription />
            </Container>
        </Box>
    );
}
