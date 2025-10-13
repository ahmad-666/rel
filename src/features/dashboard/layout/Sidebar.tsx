'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useStore from '@/store';
import { numberFormatter } from '@/utils';

type Item = {
    text: string;
    icon: string;
    route: string;
    target?: '_self' | '_blank';
};
type Props = {};

const topItems: Item[] = [
    {
        text: 'Dashboard',
        icon: 'ph:house-duotone',
        route: '/dashboard'
    },
    {
        text: 'Bulks',
        icon: 'ph:files-duotone',
        route: '/dashboard/bulks'
    },
    {
        text: 'API',
        icon: 'ph:code-duotone',
        route: '/dashboard/api'
    },
    {
        text: 'Integration',
        icon: 'ph:plugs-connected-duotone',
        route: '/dashboard/integrations'
    },
    {
        text: 'Google Sheets Add-on',
        icon: 'ph:microsoft-excel-logo-duotone',
        route: 'https://workspace.google.com/marketplace/app/company_url_finder/301716986836',
        target: '_blank'
    }
];
const bottomItems: Item[] = [
    {
        text: 'Profile',
        icon: 'ph:user-circle-duotone',
        route: '/dashboard/account'
    },
    {
        text: 'Subscription',
        icon: 'ph:identification-card-duotone',
        route: '/dashboard/subscription'
    },
    {
        text: 'Usage',
        icon: 'ph:chart-line-duotone',
        route: '/dashboard/usage'
    }
];

export default function Sidebar({}: Props) {
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('laptop'));
    const { credits } = useStore((store) => store.user);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!isMobile) setOpen(true);
        else setOpen(false);
    }, [pathname, isMobile]);

    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                // permanent for desktop --> always visible without any backdrop or ...
                // temporary for mobile --> with backdrop and click on backdrop will trigger onClose
                variant={isMobile ? 'temporary' : 'permanent'}
                anchor='left'
                hideBackdrop={!isMobile}
                slotProps={{
                    root: {
                        sx: {
                            width: !open ? 0 : undefined //for make sure sidebar not take any space when it's closed
                        }
                    },
                    paper: {
                        sx: {
                            width: 250,
                            height: '100%',
                            px: 6,
                            py: 4,
                            bgcolor: 'neutral.light5',
                            border: 'none',
                            // borderRight: 1,
                            // borderColor: 'neutral.light3',
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 4,
                            zIndex: 4
                        }
                    }
                }}
            >
                <Box>
                    <Link href='/'>
                        <Image
                            priority
                            src='/imgs/logos/logo-text-h-2.png'
                            alt='company url finder'
                            width={250}
                            height={250}
                            style={{
                                width: '190px'
                            }}
                        />
                    </Link>
                    <Box mt={8}>
                        <List>
                            {topItems.map((item) => {
                                const isActive = item.route === pathname;
                                return (
                                    <ListItem
                                        key={item.text}
                                        sx={{
                                            my: 1,
                                            p: 0
                                        }}
                                    >
                                        <ListItemButton
                                            component={Link}
                                            target={item.target || '_self'}
                                            href={item.route}
                                            sx={{
                                                p: 1.5,
                                                bgcolor: isActive ? 'primary.light4' : 'transparent',
                                                borderRadius: 2
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 0 }}>
                                                <Icon
                                                    icon={item.icon}
                                                    color={isActive ? 'primary.dark4' : 'neutral.dark4'}
                                                    size='2sm'
                                                    className='mr-2'
                                                />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    component='p'
                                                    variant='labelMd'
                                                    color={isActive ? 'primary.dark4' : 'neutral.dark4'}
                                                >
                                                    {item.text}
                                                </Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box mt={10}>
                        <Typography component='h6' variant='labelSm' color='neutral'>
                            Account
                        </Typography>
                        <List sx={{ mt: 0 }}>
                            {bottomItems.map((item) => {
                                const isActive = item.route === pathname;
                                return (
                                    <ListItem
                                        key={item.text}
                                        sx={{
                                            my: 1,
                                            p: 0
                                        }}
                                    >
                                        <ListItemButton
                                            component={Link}
                                            target={item.target || '_self'}
                                            href={item.route}
                                            sx={{
                                                p: 1.5,
                                                bgcolor: isActive ? 'primary.light4' : 'transparent',
                                                borderRadius: 2
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 0 }}>
                                                <Icon
                                                    icon={item.icon}
                                                    color={isActive ? 'primary.dark4' : 'neutral.dark4'}
                                                    size='2sm'
                                                    className='mr-2'
                                                />
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    component='p'
                                                    variant='labelMd'
                                                    color={isActive ? 'primary.dark4' : 'neutral.dark4'}
                                                >
                                                    {item.text}
                                                </Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
                <Stack
                    px={5}
                    pt={3}
                    pb={6}
                    borderRadius={3}
                    bgcolor='primary.main'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    sx={{
                        background: 'url("/imgs/patterns/orange.png") no-repeat center center / cover'
                    }}
                >
                    <Typography component='p' variant='headlineLg' color='white' align='center'>
                        {numberFormatter(credits || 0)}
                    </Typography>
                    <Typography mt={1} component='p' variant='titleMd' color='white' align='center'>
                        Credits Remaining
                    </Typography>
                    <Box
                        sx={{
                            width: 1,
                            mt: 6
                        }}
                    >
                        <Button
                            href='/dashboard/plans'
                            fullWidth
                            variant='contained'
                            size='small'
                            color='neutral'
                            bgColor='white'
                            textColor='neutral.dark4'
                            sx={{ typography: 'labelMd' }}
                        >
                            Upgrade Now
                        </Button>
                    </Box>

                    <Typography mt={1} component='p' variant='bodySm' color='white' align='center'>
                        To discover more results
                    </Typography>
                </Stack>
            </Drawer>
            {isMobile && (
                <Button
                    variant='contained'
                    size='medium'
                    onClick={() => setOpen((old) => !old)}
                    sx={{
                        width: 45,
                        minWidth: 0,
                        height: 45,
                        p: 0,
                        borderRadius: '50%',
                        position: 'fixed',
                        zIndex: 2,
                        right: { mobile: 20, tablet: 30 },
                        bottom: { mobile: 75, tablet: 85 }
                    }}
                >
                    <Icon icon='heroicons:adjustments-horizontal' size='lg' color='white' />
                </Button>
            )}
        </>
    );
}
