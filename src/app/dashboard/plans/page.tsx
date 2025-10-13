import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@/components/Container/Mui';
import PlansList from '@dashboard/components/plan/List';

export const metadata: Metadata = {
    title: 'Plans List'
};

export default function DashboardUpgradePage() {
    return (
        <Box mt={12}>
            <Container size='xl'>
                <PlansList />
            </Container>
        </Box>
    );
}
