'use client'; //this is dashboard layout so no problem if we add 'use client' on it

import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '@dashboard/layout/Navbar';
import Sidebar from '@dashboard/layout/Sidebar';
import useStore from '@/store';

type Props = BoxProps & {};

export default function DashboardLayout({ children, ...rest }: Props) {
    const user = useStore((store) => store.user);
    const isLoading = !user.token || !user.activePlan; //if we don't have user token,active plan it means we are fetching it

    return (
        <Box {...rest}>
            <aside>
                <Sidebar />
            </aside>
            <Box
                sx={{
                    header: {
                        pl: {
                            mobile: 0,
                            laptop: 62.5
                        }
                    },
                    main: {
                        pt: 0,
                        pb: 10,
                        pl: {
                            mobile: 0,
                            laptop: 62.5
                        },
                        minHeight: '100vh'
                    }
                }}
            >
                <header>
                    <Navbar />
                </header>
                <main>
                    {isLoading ? (
                        <Stack justifyContent='center' p={10}>
                            <CircularProgress variant='indeterminate' size={60} color='primary' />
                        </Stack>
                    ) : (
                        children
                    )}
                </main>
            </Box>
        </Box>
    );
}
