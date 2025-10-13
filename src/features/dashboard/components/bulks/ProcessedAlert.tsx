import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

type Props = StackProps & {
    bulkName: string;
};

export default function ProcessedAlert({ bulkName, ...rest }: Props) {
    return (
        <Stack p={4} borderRadius={2} bgcolor='info.light5' alignItems='center' gap={3} {...rest}>
            <CircularProgress
                variant='indeterminate'
                color='info'
                size={26}
                sx={{
                    '& svg': {
                        color: 'info.dark5'
                    }
                }}
            />
            <Typography component='h6' variant='labelLg' color='info.dark5'>
                You have a file titled {`"${bulkName}"`} being processed...
            </Typography>
        </Stack>
    );
}
