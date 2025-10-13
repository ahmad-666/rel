import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@/components/Container/Mui';
import BulksList from '@dashboard/components/bulks/List';

type SearchParams = {
    upload?: string;
};

export const metadata: Metadata = {
    title: 'Bulks List'
};

export default async function DashboardBulksPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const { upload } = await searchParams;

    return (
        <Box mt={12}>
            <Container size='xl' overflow='visible'>
                <BulksList showUpload={upload === 'true'} />
            </Container>
        </Box>
    );
}
