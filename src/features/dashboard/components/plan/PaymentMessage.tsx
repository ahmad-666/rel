import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@/components/Button/Mui';
import Icon from '@/components/Icon';
import { PaymentStatus } from '@dashboard/types/Plan';

type Props = BoxProps & {
    status: PaymentStatus;
    onBtnClick?: () => void;
};

export default function PaymentMessage({ status, onBtnClick, ...rest }: Props) {
    const isSuccess = status === PaymentStatus.SUCCESS;

    return (
        <Box {...rest}>
            <Stack direction='column' alignItems='center'>
                <Icon
                    icon={isSuccess ? 'ph:check-circle-fill' : 'ph:x-circle-fill'}
                    color={isSuccess ? 'success' : 'error'}
                    size={80}
                />
                <Typography mt={6} component='h3' variant='titleLg' color='neutral.dark4' align='center'>
                    {isSuccess ? 'Payment Successful ' : 'Payment Failed '}
                </Typography>
                <Typography
                    mt={3}
                    component='p'
                    variant='bodySm'
                    color='neutral.main'
                    align='center'
                    width={{
                        mobile: 1,
                        tablet: 0.55
                    }}
                >
                    {isSuccess
                        ? 'Thank you for your payment, your payment has been completed.'
                        : 'Your payment failed, please try again.'}
                </Typography>
                {!isSuccess && (
                    <Button
                        variant='contained'
                        size='medium'
                        bgColor='neutral.dark4'
                        onClick={onBtnClick}
                        sx={{ mt: 4, px: 15 }}
                    >
                        Try Again
                    </Button>
                )}
            </Stack>
        </Box>
    );
}
