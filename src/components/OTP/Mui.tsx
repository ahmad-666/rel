'use client';

import { useState, type FocusEvent } from 'react';
import OtpInput from 'react-otp-input';
import Box, { type BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Textfield, { type Size } from '@/components/Textfield/Mui';

export type Type = 'number' | 'text';
export type Color = 'primary';
type Props = Omit<BoxProps, 'onChange'> & {
    value: string;
    onChange: (newVal: string) => void;
    type?: Type;
    length?: number;
    label?: string;
    size?: Size;
    color?: Color;
    hideMessage?: boolean;
    error?: boolean;
    helperText?: string;
};

export default function OTP({
    value,
    onChange,
    type = 'text',
    length = 5,
    label,
    size = 'md',
    color = 'primary',
    hideMessage = false,
    error,
    helperText,
    sx,
    ...rest
}: Props) {
    const [isFocus, setIsFocus] = useState(false);
    const outsideLabelColor = error ? 'error.main' : isFocus ? `${color}.main` : 'neutral.dark4';
    const accentColor = error ? 'error.main' : isFocus ? `${color}.main` : 'neutral.light2';
    const inputWidth = size === 'sm' ? 32 : size === 'md' ? 36 : 48;

    return (
        <Box
            sx={{
                '& > div': {
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: {
                        mobile: 1.5,
                        tablet: 3
                    },
                    '& .MuiFormControl-root': {
                        '& > div': {
                            width: `${inputWidth}px !important`
                        },
                        input: {
                            textAlign: 'center'
                        }
                    }
                },
                ...sx
            }}
            {...rest}
        >
            {!!label && (
                <InputLabel
                    sx={{
                        display: 'inline-block',
                        typography: 'labelMd',
                        color: outsideLabelColor,
                        mb: 2
                    }}
                >
                    {label}
                </InputLabel>
            )}
            <OtpInput
                value={value}
                onChange={onChange}
                numInputs={length}
                inputType={type}
                renderInput={({ ref, onFocus, onBlur, ...rest }, index) => (
                    //? ref of mui Textfield should be passed to 'inputRef' prop and props of <input /> should be passed to 'slotProps.input' prop
                    <Textfield
                        key={index}
                        inputRef={ref}
                        variant='outlined'
                        size={size}
                        color={color}
                        bgColor='white'
                        borderColor='neutral.light2'
                        error={error}
                        onFocus={(e) => {
                            setIsFocus(true);
                            onFocus(e as FocusEvent<HTMLInputElement>);
                        }}
                        onBlur={(e) => {
                            setIsFocus(false);
                            onBlur(e as FocusEvent<HTMLInputElement>);
                        }}
                        slotProps={{
                            input: {
                                ...rest
                            }
                        }}
                    />
                )}
                // renderSeparator={<span>-</span>}
                // containerStyle={}
                // inputStyle={}
            />
            {!hideMessage && (
                <FormHelperText
                    error={error}
                    sx={{
                        '&.MuiFormHelperText-root': {
                            mt: 1,
                            ml: 2,
                            typography: 'labelMd',
                            color: accentColor
                        }
                    }}
                >
                    {helperText}
                </FormHelperText>
            )}
        </Box>
    );
}

//? Usage;
// const [val, setVal] = useState('');
// <OTP type='text' value={val} onChange={setVal} length={5}
//     size='lg' label='label' error helperText='error text'
// />
