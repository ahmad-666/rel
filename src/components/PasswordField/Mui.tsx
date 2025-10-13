import { useState, type ComponentProps } from 'react';
import Box from '@mui/material/Box';
import Textfield from '@/components/Textfield/Mui';
import IconButton from '@mui/material/IconButton';
import Icon, { type Size as IconSize } from '@/components/Icon';
import PasswordChecker from './Checker';
import { type PasswordCheck } from '@/types/Common';

type Props = Omit<ComponentProps<typeof Textfield>, 'type' | 'appendJSX'> & {
    /** add visualized validation for password */
    checks?: PasswordCheck[];
};

export default function PasswordField({ value, checks = [], sx, ...rest }: Props) {
    const [show, setShow] = useState(false);

    return (
        <Box sx={{ ...sx }}>
            <Textfield
                {...rest}
                value={value}
                type={show ? 'text' : 'password'}
                appendJSX={({ isFocus, isError, accentColor, iconSize }) => (
                    <IconButton size='small' onClick={() => setShow((old) => !old)}>
                        <Icon
                            icon={show ? 'ph:eye' : 'ph:eye-closed'}
                            color={!isFocus && !isError ? 'neutral.main' : accentColor}
                            size={iconSize as IconSize}
                        />
                    </IconButton>
                )}
            />
            {!!checks.length && <PasswordChecker mt={4} password={(value as string) || ''} checks={checks} />}
        </Box>
    );
}

//? Usage:with react-hook-form:
// import { getPasswordChecks } from '@/utils/validation';
// <Controller control={control} name='password'
//     rules={{
//         //? required: 'Field is required',
//         //? minLength: { value: 8, message: 'Password should contains at least 8 characters' },
//         //? pattern:{value: /something/,message: 'error message'},
//         validate: (val) => {
//             const checks = getPasswordChecks({required: true,minLength8: true,oneNumber: true,oneLowerCase: true,oneUpperCase: true});
//             const error = checks.find((check) => !check.validator(val));
//             return error?.message || true;
//         }
//     }}
//     render={({ field, fieldState }) => (
//         <PasswordField {...field}
//             checks={getPasswordChecks({required: true,minLength8: true,oneNumber: true,oneLowerCase: true,oneUpperCase: true})}
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
//         />
//     )}
// />
