'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Container from '@/components/Container/Mui';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import useStore from '@/store';
import { numberFormatter } from '@/utils';

type Item = {
    icon: string;
    color: string;
    text: string;
    href?: string;
    onClick?: () => void;
};
type Props = {};

export default function Navbar({}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const logout = useStore((store) => store.logout);
    const { name, imgSrc, credits } = useStore((store) => store.user);
    const username = name || 'User';
    const [menuEl, setMenuEl] = useState<null | HTMLDivElement>(null);
    const items: Item[] = [
        {
            icon: 'ph:user-circle',
            color: 'neutral.dark4',
            text: 'Account',
            href: '/dashboard/account'
        },
        {
            icon: 'ph:sign-out',
            color: 'error.dark',
            text: 'Log out',
            onClick: () => {
                logout();
                router.replace('/');
            }
        }
    ];
    useEffect(() => {
        setMenuEl(null);
    }, [pathname]);

    return (
        <AppBar
            component='div'
            variant='outlined'
            position='relative'
            sx={{
                width: 1,
                bgcolor: 'white',
                zIndex: 3,
                border: 'none',
                borderBottom: 1,
                borderColor: 'neutral.light4',
                overflow: 'auto'
            }}
        >
            {/* if we want align content we should put content inside bellow Container */}
            {/* <Container size='xl' overflow='auto'>  </Container> */}
            <Stack py={1.5} px={{ mobile: 2, tablet: 5 }} justifyContent='space-between' alignItems='center' gap={2}>
                <Box
                    flexShrink={0}
                    display={{
                        mobile: 'none',
                        laptop: 'block'
                    }}
                >
                    <Box>
                        <Typography component='span' variant='bodyMd' color='neutral'>
                            Welcome Back,
                        </Typography>{' '}
                        <Typography component='span' variant='bodyMd' color='neutral.dark4' textTransform='capitalize'>
                            {username}
                        </Typography>
                        {'   '}
                        👋
                    </Box>
                </Box>
                <Box flexGrow={{ mobile: 1, laptop: 0 }}>
                    <Stack justifyContent='space-between' alignItems='center' gap={2}>
                        <Stack
                            bgcolor='warning.light5'
                            borderRadius={2}
                            px={0.5}
                            py={0.5}
                            border={1}
                            borderColor='warning.light4'
                            alignItems='center'
                            gap={4}
                        >
                            <Stack alignItems='center' gap={1}>
                                <Image
                                    priority
                                    src='/imgs/others/triangle.png'
                                    alt='credits'
                                    width={32}
                                    height={32}
                                    style={{
                                        flexShrink: 0,
                                        width: '22px'
                                    }}
                                />
                                <Typography component='p' variant='labelMd' color='warning.dark5'>
                                    {numberFormatter(credits || 0)} credits
                                </Typography>
                            </Stack>
                            <Button
                                href='/dashboard/plans'
                                variant='contained'
                                size='small'
                                color='warning'
                                bgColor='warning.dark5'
                                textColor='white'
                                sx={{ borderRadius: 2, px: 6 }}
                            >
                                Upgrade
                            </Button>
                        </Stack>
                        <Stack
                            p={1}
                            pr={3}
                            border={1}
                            borderColor='neutral.light3'
                            borderRadius={2}
                            alignItems='center'
                            gap={2}
                            onClick={(e) => setMenuEl(e.currentTarget)}
                            sx={{ cursor: 'pointer' }}
                        >
                            <Avatar sx={{ width: '25px', height: '25px', bgcolor: 'neutral', fontSize: 'labelLg' }}>
                                {username[0]}
                            </Avatar>
                            <Typography variant='labelMd' color='neutral.dark4' textTransform='capitalize'>
                                {username}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
            <Menu
                anchorEl={menuEl}
                open={!!menuEl}
                onClose={() => setMenuEl(null)}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                slotProps={{
                    root: {
                        sx: {
                            '& .MuiList-root': {
                                p: 0
                            }
                        }
                    },
                    paper: {
                        sx: {
                            mt: 2,
                            width: 160,
                            p: 0,
                            bgcolor: 'white',
                            border: 1,
                            borderColor: 'neutral.light2',
                            borderRadius: 2,
                            boxShadow: 0
                        }
                    }
                }}
            >
                {items.map((item) => (
                    <MenuItem
                        key={item.text}
                        component={item.href ? Link : 'button'}
                        href={item.href}
                        onClick={item.onClick}
                        sx={{
                            width: 1,
                            typography: 'labelMd',
                            color: item.color,
                            p: 2,
                            minHeight: 0
                        }}
                    >
                        <Icon icon={item.icon} color='inherit' size='md' className='mr-2' />
                        {item.text}
                    </MenuItem>
                ))}
            </Menu>
        </AppBar>
    );
}
