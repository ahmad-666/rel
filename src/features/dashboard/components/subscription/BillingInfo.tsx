import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import { type UserBilling } from '@dashboard/types/Plan';

type Item = {
    title: string;
    value: string;
};
type Props = BoxProps & Pick<UserBilling, 'user' | 'portalUrl'>;

export default function PaymentBillingInfo({ user, portalUrl, ...rest }: Props) {
    const items: Item[] = [
        {
            title: 'Name/Company Name',
            value: user.name || ''
        },
        {
            title: 'Address',
            value: user.address || ''
        }
    ].filter((item) => !!item.value);

    return (
        <Box {...rest}>
            <Typography component='h6' variant='titleMd' color='neutral.dark4'>
                Billing Information
            </Typography>
            <Box mt={4} py={5} px={10} border={1} borderColor='neutral.light3' borderRadius={3}>
                {items.map((item) => (
                    <Box
                        key={item.title}
                        sx={{
                            '&:not(:first-child)': {
                                mt: 6
                            }
                        }}
                    >
                        <Typography component='h6' variant='labelMd' color='neutral'>
                            {item.title}
                        </Typography>
                        <Typography mt={1} component='p' variant='labelLg' color='neutral.dark4'>
                            {item.value}
                        </Typography>
                    </Box>
                ))}
                <Stack mt={8} justifyContent='flex-end'>
                    <Button
                        disabled={!portalUrl}
                        target='_blank'
                        href={portalUrl}
                        variant='outlined'
                        size='small'
                        color='neutral'
                        borderColor='neutral.light2'
                        textColor='neutral.dark4'
                    >
                        Edit Information
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
