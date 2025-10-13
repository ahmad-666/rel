import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@/components/Container/Mui';
import ApiDetails from '@dashboard/components/api/ApiDetails';
import ApiPreview from '@dashboard/components/api/ApiPreview';

export const metadata: Metadata = {
    title: 'Dashboard API'
};

export default function DashboardAccountPage() {
    return (
        <Box mt={12}>
            <Container size='xl' overflow='visible'>
                <ApiDetails />
                <ApiPreview mt={20} />
            </Container>
        </Box>
    );
}
