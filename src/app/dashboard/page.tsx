import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@/components/Container/Mui';
import EmailLookup from '@dashboard/components/email-lookup';
import EmailLookupCard from '@dashboard/components/email-lookup/Card';

export const metadata: Metadata = {
    title: 'Dashboard Home Page | Reverse Email Lookup'
};

export default function DashboardHomePage() {
    return (
        <Box>
            <Box px={8} py={16} bgcolor='primary.light5'>
                <Typography component='h1' variant='headlineLg' color='primary.dark4' align='center'>
                    +1B Professional Profiles{' '}
                </Typography>
            </Box>
            <Box mt={12}>
                <EmailLookup />
            </Box>
            <Container mt={18} size='xs'>
                <Typography component='h2' variant='titleLg' color='neutral.dark4'>
                    Bonus Credits
                </Typography>
                <EmailLookupCard
                    mt={5}
                    title='Upload Bulk'
                    description='You can upload a bulk of emails and get the results.'
                    imgSrc='/imgs/others/excel-formats-blue.png'
                    link='/dashboard/bulks?upload=true'
                    credits={5}
                />
            </Container>
        </Box>
    );
}
