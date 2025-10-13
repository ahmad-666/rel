import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@/components/Container/Mui';
import BulkDetails from '@dashboard/components/bulks/Details';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export const metadata: Metadata = {
    title: 'Bulk Details'
};

export default async function DashboardBulkDetailsPage({ params }: Props) {
    const { id } = await params;

    return (
        <Box mt={12}>
            <Container size='xl'>
                <BulkDetails bulkId={+id} />
            </Container>
        </Box>
    );
}
