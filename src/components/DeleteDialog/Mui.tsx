import { type ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';

type Props = {
    show?: boolean;
    onShowChange?: (val: boolean) => void;
    title?: string;
    description?: ReactNode;
    width?: number;
    loading?: boolean;
    onSubmitClick?: () => void;
};

export default function DeleteDialog({
    show = false,
    onShowChange,
    title = 'Delete',
    description = 'Are you sure that you want to delete selected item(s) ?',
    width = 600,
    loading = false,
    onSubmitClick
}: Props) {
    return (
        <Dialog
            open={show}
            onClose={() => onShowChange?.(false)}
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: 'white',
                        width,
                        maxWidth: '90vw',
                        p: 6,
                        pt: 8,
                        borderRadius: 3
                    }
                }
            }}
        >
            <Stack justifyContent='space-between' alignItems='center' gap={4}>
                <Typography component='h5' variant='labelLg' color='neutral.dark4' textTransform='capitalize'>
                    {title}
                </Typography>
                <IconButton size='small' onClick={() => onShowChange?.(false)}>
                    <Icon icon='mdi:close' size='sm' color='neutral.light' />
                </IconButton>
            </Stack>
            <DialogContent sx={{ mt: 3, p: 0 }}>
                <Typography component='p' variant='bodySm' color='neutral.dark'>
                    {description}
                </Typography>
                <Stack mt={10} px={1} pb={2} justifyContent='flex-end' gap={2}>
                    <Button
                        variant='text'
                        size='medium'
                        color='neutral'
                        sx={{ px: 8 }}
                        onClick={() => onShowChange?.(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='outlined'
                        size='medium'
                        textColor='error.main'
                        borderColor='neutral.light3'
                        outlineColor='error.main'
                        loading={loading}
                        sx={{ px: 10 }}
                        onClick={() => onSubmitClick?.()}
                    >
                        Delete
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

//? Usage:
// const [show, setShow] = useState(false);
// <button onClick={() => setShow(true)}>click me</button>
// <DeleteDialog show={show} onShowChange={() => setShow(false)}
//      title='title' description='desc'
//     onSubmitClick={() => setShow(false)}
// />
