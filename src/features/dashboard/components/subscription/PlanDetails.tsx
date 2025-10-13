import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@/components/Button/Mui';
import dayjs from '@/libs/dayjs';
import { parsePlanStatus, parsePlanDuration } from '@dashboard/utils';
import { Duration, type UserPlan, type UserBilling } from '@dashboard/types/Plan';

type Props = BoxProps & UserPlan & Pick<UserBilling, 'portalUrl'> & {};

export default function PlanDetails({
    id,
    type,
    name,
    status,
    duration,
    price = 0,
    startDate,
    endDate,
    portalUrl,
    ...rest
}: Props) {
    const monthlyPrice = duration === Duration.YEARLY ? Math.round(price / 12) : price;
    const parsedDuration = parsePlanDuration(duration);
    const parsedStatus = parsePlanStatus(status!);
    // const isFree = type === Type.Free;
    const endDateFormatted = `${dayjs(endDate).format('MMMM D, YYYY')} at ${dayjs(endDate).utc().format('HH:mm')}`;

    return (
        <Box overflow='hidden' px={7} py={5} border={1} borderColor='neutral.light2' borderRadius={3} {...rest}>
            <Stack justifyContent='space-between' alignItems='center' gap={2}>
                <Typography component='h5' variant='labelLg' color='neutral.dark4'>
                    Your Current Plan
                </Typography>
                <Button
                    target='_blank'
                    href={portalUrl}
                    disabled={!portalUrl}
                    variant='outlined'
                    size='medium'
                    color='neutral'
                    textColor='neutral.dark4'
                    borderColor='neutral.light4'
                    outlineColor='neutral.dark4'
                    sx={{ px: 6 }}
                    className='shadow-xs'
                >
                    Change Plan
                </Button>
            </Stack>
            <Divider sx={{ my: 6, borderColor: 'neutral.light3' }} />
            <Box>
                <Typography component='h4' variant='titleLg' color='neutral.dark4' textTransform='capitalize'>
                    {name}
                </Typography>
                <Typography mt={4} component='p' variant='headlineLg' color='neutral.dark4'>
                    ${monthlyPrice}/
                    <Typography component='span' variant='bodyMd' color='neutral'>
                        Month
                    </Typography>
                </Typography>
                <Stack
                    mt={10}
                    direction={{ mobile: 'column', tablet: 'row' }}
                    justifyContent='space-between'
                    alignItems='flex-start'
                    gap={10}
                    flexWrap='wrap'
                >
                    <Box>
                        <Stack alignItems='center' gap={3}>
                            <Typography component='p' variant='labelLg' color='neutral.dark4'>
                                Status
                            </Typography>
                        </Stack>
                        <Chip
                            size='small'
                            label={parsedStatus.text}
                            sx={{
                                mt: 1,
                                typography: 'labelMd',
                                textTransform: 'capitalize',
                                bgcolor: parsedStatus.lightenColor,
                                color: parsedStatus.darkenColor
                            }}
                        />
                    </Box>
                    <Box>
                        <Stack alignItems='center' gap={3}>
                            <Typography component='p' variant='labelLg' color='neutral.dark4'>
                                Billing Period
                            </Typography>
                        </Stack>
                        <Typography component='p' variant='bodySm' color='neutral' textTransform='capitalize'>
                            {parsedDuration.text}
                        </Typography>
                        {duration !== Duration.YEARLY && (
                            <Chip
                                size='small'
                                label='Pay yearly and save 30%'
                                sx={{
                                    mt: 1,
                                    typography: 'labelMd',
                                    bgcolor: 'info.light2',
                                    color: 'info.dark'
                                }}
                            />
                        )}
                    </Box>
                    <Box>
                        <Typography component='p' variant='labelLg' color='neutral.dark4'>
                            End Date
                        </Typography>
                        <Typography mt={1} component='p' variant='bodySm' color='neutral'>
                            {endDateFormatted}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
