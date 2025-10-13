'use client';

import { useState } from 'react';
import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@/components/Button/Mui';
import BulkUploadForm from '@dashboard/components/bulks/UploadForm';

type Props = BoxProps & {
    onBulkSubmit?: () => void;
};

export default function BulksEmptyState({ onBulkSubmit, ...rest }: Props) {
    const [addDialog, setAddDialog] = useState(false);
    const bulkSubmitHandler = () => {
        setAddDialog(false);
        onBulkSubmit?.();
    };

    return (
        <Box maxWidth={1} {...rest}>
            <Stack
                pt={80}
                pb={20}
                direction='column'
                justifyContent='center'
                alignItems='center'
                sx={{
                    background: 'url("/imgs/others/file-formats.png") no-repeat center center / contain'
                }}
            >
                <Typography component='h4' variant='titleLg' color='neutral.dark4' align='center'>
                    You have not uploaded a bulk yet
                </Typography>
                <Typography mt={3} component='p' variant='bodySm' color='neutral.main' align='center'>
                    Create your first bulk
                </Typography>
                <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    onClick={() => setAddDialog(true)}
                    sx={{ mt: 6 }}
                >
                    Upload your company email list now
                </Button>
            </Stack>
            <Dialog
                open={addDialog}
                onClose={() => setAddDialog(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 600,
                            maxWidth: '90%',
                            borderRadius: 3,
                            bgcolor: 'white'
                        }
                    }
                }}
            >
                <DialogContent sx={{ p: 6 }}>
                    <BulkUploadForm closable onClose={() => setAddDialog(false)} onBulkSubmit={bulkSubmitHandler} />
                </DialogContent>
            </Dialog>
        </Box>
    );
}
