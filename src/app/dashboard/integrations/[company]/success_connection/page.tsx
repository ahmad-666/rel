import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import ConnectionMessage from '@dashboard/components/integrations/ConnectionMessage';
import { Status, Company } from '@dashboard/types/Integration';

type Params = {
    company: Company;
};
export const metadata: Metadata = {
    title: 'Integration Connected'
};

export default async function DashboardIntegrationConnectedPage({ params }: { params: Promise<Params> }) {
    const { company } = await params;

    return (
        <Box>
            <ConnectionMessage status={Status.CONNECT} company={company} />
        </Box>
    );
}
