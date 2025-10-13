import Box, { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '@/components/Icon';
import { type PasswordCheck } from '@/types/Common';

type Props = BoxProps & {
    password: string;
    checks?: PasswordCheck[];
};

export default function PasswordChecker({ password = '', checks = [], ...rest }: Props) {
    return (
        <Box {...rest}>
            {checks.map((check) => {
                const checked = check.validator(password);
                return (
                    <Stack key={check.label} alignItems='center' gap={2} sx={{ my: 2 }}>
                        <Box
                            flexShrink={0}
                            bgcolor={checked ? 'success.main' : 'neutral.light3'}
                            width={14}
                            height={14}
                            borderRadius='50%'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                        >
                            {checked && <Icon icon='ph:check' size={8} color='white' />}
                        </Box>
                        <Typography
                            flexGrow={1}
                            component='p'
                            variant='labelMd'
                            color={checked ? 'success' : 'neutral'}
                            textTransform='capitalize'
                        >
                            {check.label}
                        </Typography>
                    </Stack>
                );
            })}
        </Box>
    );
}
