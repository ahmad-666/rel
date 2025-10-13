import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@/components/Container/Mui';
import Info from '@dashboard/components/user/Info';

export const metadata: Metadata = {
    title: 'Dashboard Account'
};

export default function DashboardAccountPage() {
    return (
        <Box mt={12}>
            <Container size='xl'>
                <Info />
            </Container>
        </Box>
    );
}
