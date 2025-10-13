import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Icon from '@/components/Icon';

type Item = {
    icon: string;
    text: string;
    color?: string;
    disabled?: boolean;
    href?: string;
    onClick?: () => void;
};

type Props = StackProps & {
    items: Item[];
};

export default function TableActions({ items = [], ...rest }: Props) {
    return (
        <Stack height={1} alignItems='center' gap={1} flexWrap='wrap' {...rest}>
            {items.map(({ icon, text, color, disabled, href, onClick }) => {
                const jsx = (
                    <IconButton size='small' disabled={disabled} onClick={onClick} sx={{ display: 'flex' }}>
                        <Icon icon={icon} color={color || 'neutral.dark1'} size='sm' />
                    </IconButton>
                );
                return (
                    <Tooltip
                        key={text}
                        placement='bottom'
                        title={
                            <Typography component='span' variant='bodySm' color='white' textTransform='capitalize'>
                                {text}
                            </Typography>
                        }
                        slotProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: 'neutral.dark4',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 1
                                }
                            }
                        }}
                    >
                        <Box sx={{ opacity: disabled ? 0.3 : 1 }}>
                            {href ? (
                                <Link
                                    href={href}
                                    style={{
                                        pointerEvents: disabled ? 'none' : 'initial'
                                    }}
                                >
                                    {jsx}
                                </Link>
                            ) : (
                                jsx
                            )}
                        </Box>
                    </Tooltip>
                );
            })}
        </Stack>
    );
}

//? Usage:
// const columns = useMemo<GridColDef<Row>[]>(() => {
//     return [
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             minWidth: 100,
//             flex: 1, //fill empty space
//             renderCell: ({ row }) => (
//                 <TableActions
//                     items={[
//                         {text: 'download',icon: 'ph:download-simple',href:'...'},
//                         {text: 'delete',icon: 'ph:trash-simple',onClick: () => {}}
//                     ]}
//                 />
//             )
//         }
//     ];
// }, []);
