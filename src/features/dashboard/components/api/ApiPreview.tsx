'use client';

import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import useSnackbar from '@/hooks/useSnackbar';

type Props = BoxProps & {};

const code = `
   curl -X POST -H "x-api-key: <your_api_key>" -H "Content-Type: application/x-www-form-urlencoded" 
   --data-urlencode "email=your_email@example.com"
   --location https://api.reverseemaillookup.net/v1/services/email_lookup

`; //? we can use '\n' or press enter or '\\' for escape '\'

export default function ApiPreview({ ...rest }: Props) {
    const { setSnackbar } = useSnackbar();
    const copyToClipboard = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(code);
            setSnackbar({ type: 'success', show: true, message: 'Copied ...' });
        } else {
            setSnackbar({ type: 'error', show: true, message: 'Your browser does not support this feature ...' });
        }
    };

    return (
        <Box {...rest}>
            <Stack justifyContent='space-between' alignItems='center' gap={4} flexWrap='wrap'>
                <Typography component='h2' variant='titleLg' color='neutral.dark4'>
                    API Overview
                </Typography>
                <Button
                    variant='outlined'
                    color='neutral'
                    borderColor='neutral.light2'
                    onClick={copyToClipboard}
                    sx={{ minWidth: 'initial', width: 32, p: 1, mr: 2 }}
                >
                    <Icon icon='ph:copy' size='sm' color='neutral.dark4' />
                </Button>
            </Stack>
            <Box
                mt={8}
                overflow='hidden'
                borderRadius={4}
                sx={{
                    '& .code-container': {
                        mt: 0
                    }
                }}
            >
                <SyntaxHighlighter
                    code={code}
                    lang='bash'
                    theme='poimandres'
                    color='neutral.dark4'
                    copyToClipboard={false}
                />
            </Box>
        </Box>
    );
}
