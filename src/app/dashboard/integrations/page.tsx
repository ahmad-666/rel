import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@/components/Container/Mui';
import IntegrationsList from '@dashboard/components/integrations/Lists';

export const metadata: Metadata = {
    title: 'Integrations'
};

export default function DashboardIntegrationsPage() {
    return (
        <Box mt={12}>
            <Typography ml={8} component='h1' variant='titleLg' color='neutral.dark4'>
                Integrations
            </Typography>
            <Container mt={12} size='lg'>
                <IntegrationsList variant='connection' />
            </Container>
        </Box>
    );
}
