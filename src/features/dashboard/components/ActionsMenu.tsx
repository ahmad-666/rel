'use client';

import Link from 'next/link';
import Menu, { type MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@/components/Icon';

type Item = {
    icon: string;
    label: string;
    textColor?: string;
    bgColor?: string;
    loading?: boolean;
    href?: string;
    onClick?: () => void;
};
type Props = Omit<MenuProps, 'open'> & {
    anchorEl: null | HTMLElement;
    onClose: () => void;
    items: Item[];
};

export default function ActionsMenu({ anchorEl, onClose, items = [], ...rest }: Props) {
    return (
        <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={onClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            slotProps={{
                paper: {
                    sx: {
                        width: 180,
                        p: 1,
                        bgcolor: 'white',
                        border: 1,
                        borderColor: 'neutral.light2',
                        borderRadius: 2,
                        boxShadow: 'none'
                    }
                },
                list: {
                    component: 'div',
                    sx: {
                        p: 0
                    }
                }
            }}
            {...rest}
        >
            {items.map((item) => (
                <MenuItem
                    key={item.label}
                    component={item.href ? Link : 'button'}
                    href={item.href}
                    onClick={item.onClick}
                    sx={{
                        width: 1,
                        p: 2,
                        minHeight: 0,
                        borderRadius: 2,
                        bgcolor: item.bgColor || undefined
                    }}
                >
                    {!item.loading ? (
                        <>
                            <Icon icon={item.icon} size='2sm' color={item.textColor || 'neutral.dark4'} />
                            <Typography
                                component='span'
                                variant='labelMd'
                                color={item.textColor || 'neutral.dark4'}
                                ml={1}
                            >
                                {item.label}
                            </Typography>
                        </>
                    ) : (
                        <CircularProgress
                            variant='indeterminate'
                            size={20}
                            sx={{
                                '& svg': {
                                    color: item.textColor
                                }
                            }}
                        />
                    )}
                </MenuItem>
            ))}
        </Menu>
    );
}
