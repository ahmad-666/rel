import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import ConnectionMessage from '@dashboard/components/integrations/ConnectionMessage';
import { Status, Company } from '@dashboard/types/Integration';

type Params = {
    company: Company;
};
export const metadata: Metadata = {
    title: 'Integration Disconnected'
};

export default async function DashboardIntegrationDisconnectedPage({ params }: { params: Promise<Params> }) {
    const { company } = await params;

    return (
        <Box>
            <ConnectionMessage status={Status.DISCONNECT} company={company} />
        </Box>
    );
}
