'use client';

import { useState, useId, type FocusEvent, type ChangeEvent, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import MuiTextfield, { type TextFieldProps } from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@/components/Icon';
import { useTheme, alpha, type SxProps } from '@mui/material/styles';

export type As = 'textfield' | 'textarea';
export type Size = 'sm' | 'md' | 'lg';
export type LabelPos = 'inside' | 'outside';
type Props = Omit<TextFieldProps, 'size' | 'select'> & {
    as?: As;
    size?: Size;
    labelPos?: LabelPos;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    readOnly?: boolean;
    loading?: boolean;
    clearable?: boolean;
    hideMessage?: boolean;
    prependInnerIcon?: string;
    prependJSX?: ({
        isFocus,
        isError,
        iconSize,
        accentColor
    }: {
        isFocus: boolean;
        isError: boolean;
        iconSize: string;
        accentColor: string;
    }) => ReactNode;
    appendInnerIcon?: string;
    appendJSX?: ({
        isFocus,
        isError,
        iconSize,
        accentColor
    }: {
        isFocus: boolean;
        isError: boolean;
        iconSize: string;
        accentColor: string;
    }) => ReactNode;
    inputSx?: SxProps;
};

export default function Textfield({
    as = 'textfield',
    id, //'for' of <label> and 'id' of <input>
    type = 'text',
    variant = 'outlined',
    focused = false,
    size = 'md',
    color = 'primary', //can only consists of main colors like primary,... cannot have variants like primary.light2,...
    bgColor = 'transparent', //css colors or mui colors with variants e.g 'white','neutral.light4',...
    textColor = 'neutral.dark4', //css colors or mui colors with variants e.g 'white','neutral.light4',...
    borderColor = 'neutral.light2', //css colors or mui colors with variants e.g 'transparent','neutral.light2'
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    label,
    labelPos = 'inside',
    readOnly = false,
    disabled = false,
    loading = false,
    clearable = false,
    prependInnerIcon,
    prependJSX,
    appendInnerIcon,
    appendJSX,
    hideMessage = false,
    error,
    helperText,
    slotProps,
    inputRef,
    inputSx,
    sx,
    ...rest
}: Props) {
    const theme = useTheme();
    const generatedId = useId().replace(/[:«»]/g, '').toLowerCase();
    const inputId = id || generatedId;
    const [isFocus, setIsFocus] = useState(focused);
    const hasValue = !!value;
    const textfieldHeight = size === 'sm' ? 32 : size === 'md' ? 36 : 48;
    const iconSize = size === 'sm' ? 'sm' : 'md';
    const outsideLabelColor = error ? 'error.main' : isFocus ? `${color}.main` : 'neutral.dark4';
    const accentColor = error ? 'error.main' : isFocus ? `${color}.main` : 'neutral.light2';
    const [accentColorName, accentColorVariant] = accentColor.split('.');
    //@ts-expect-error 'manually set palette keys'
    const fadeAccentColor = alpha(theme.palette[accentColorName][accentColorVariant], 0.2);
    const showClearBtn = clearable && hasValue;
    const hasStartAdornment = !!(prependInnerIcon || prependJSX);
    const hasEndAdornment = !!(loading || showClearBtn || appendInnerIcon || appendJSX);
    const onFocusHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocus(true);
        onFocus?.(e);
    };
    const onBlurHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocus(false);
        onBlur?.(e);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange?.(e);
    };
    const onClearHandler = () => {
        onChange?.({
            target: { value: '' }
        } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    };

    return (
        <Box sx={{ ...sx }}>
            {!!(labelPos === 'outside' && label) && (
                <InputLabel
                    htmlFor={inputId}
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
            <MuiTextfield
                inputRef={inputRef}
                multiline={as === 'textarea'}
                id={inputId}
                type={type}
                variant={variant}
                fullWidth
                focused={isFocus} //we add it to have focus state in input
                size={size === 'sm' || size === 'md' ? 'small' : 'medium'}
                color={color}
                value={value}
                onChange={onChangeHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                placeholder={placeholder}
                label={labelPos === 'inside' && label ? label : undefined}
                disabled={disabled}
                error={error} //we add it to have error state in input
                // helperText={helperText} //we use separate component for it
                slotProps={{
                    input: {
                        startAdornment: hasStartAdornment ? (
                            <InputAdornment position='start' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {prependJSX?.({ isFocus, isError: !!error, iconSize, accentColor })}
                                {prependInnerIcon && (
                                    <Icon
                                        icon={prependInnerIcon}
                                        size={iconSize}
                                        color={accentColor}
                                        className='pointer-events-none'
                                    />
                                )}
                            </InputAdornment>
                        ) : null,
                        endAdornment: hasEndAdornment ? (
                            <InputAdornment position='end' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                {loading && (
                                    <CircularProgress
                                        variant='indeterminate'
                                        color={color}
                                        size={20}
                                        thickness={3}
                                        className='pointer-events-none'
                                    />
                                )}
                                {showClearBtn && (
                                    <IconButton type='button' size='small' onClick={onClearHandler}>
                                        <Icon
                                            icon='mdi:close'
                                            size={iconSize}
                                            color={accentColor}
                                            className='pointer-events-none'
                                        />
                                    </IconButton>
                                )}
                                {appendInnerIcon && (
                                    <Icon
                                        icon={appendInnerIcon}
                                        size={iconSize}
                                        color={accentColor}
                                        className='pointer-events-none'
                                    />
                                )}
                                {appendJSX?.({ isFocus, isError: !!error, iconSize, accentColor })}
                            </InputAdornment>
                        ) : null,
                        ...slotProps?.input
                    },
                    ...slotProps
                }}
                sx={{
                    opacity: disabled ? 0.5 : 1,
                    pointerEvents: readOnly || disabled ? 'none' : 'auto',
                    '& .MuiInputBase-root': {
                        minHeight: as === 'textfield' ? textfieldHeight : 'auto',
                        height: as === 'textfield' ? textfieldHeight : 'auto',
                        borderRadius: 2,
                        bgcolor: bgColor,
                        alignItems: as === 'textarea' ? 'flex-start' : 'center', //now on textarea start/end adornment is aligned from top to content
                        input: {
                            typography: 'bodySm',
                            color: textColor,
                            paddingTop: variant === 'filled' ? 0 : undefined,
                            paddingBottom: variant === 'filled' ? 0 : undefined,
                            '&::placeholder': {
                                typography: 'labelMd',
                                color: 'neutral.light1',
                                opacity: 1
                            }
                        },
                        '&::before, &::after': {
                            opacity: variant === 'filled' && !isFocus ? 0 : undefined
                        }
                    },
                    '& .MuiFormLabel-root': {
                        transform: (theme) => {
                            //if we have focus,value,prependInnerIcon then label will go to its active state
                            const isActive = isFocus || hasValue || hasStartAdornment;
                            const scale = isActive ? 0.75 : 1;
                            const translateX = 14;
                            let translateY = 0;
                            if (size === 'sm') translateY = isActive ? -9 : 5;
                            else if (size === 'md') translateY = isActive ? -9 : 7;
                            else if (size === 'lg') translateY = isActive ? -9 : 13;
                            return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                        }
                    },
                    '& fieldset': {
                        borderColor,
                        boxShadow: isFocus || error ? `0 0 0 2px ${fadeAccentColor}` : 'initial'
                    },
                    ...inputSx
                }}
                {...rest}
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

//? Usage:
//* #1: Textfield with props:
// const [val, setVal] = useState('init');
// <Textfield id='my-id' name="my-name" variant='outlined' color='primary' bgColor='neutral.light4' borderColor='transparent'
//     size='lg' value={val} onChange={(e) => setVal(e.target.value)}
//     placeholder='placeholder' label='label' labelPos='outside'
//     required readOnly={false} disabled={false} error={false} helperText='helper' sx={{ mt: 5, width: 300 }}
// />
//* #2: Textfield as textarea with props:
// const [val, setVal] = useState('init');
// <Textfield as='textarea' value={val} onChange={(e) => setVal(e.target.value)} label='label'
//     minRows={3} maxRows={5} clearable loading prependInnerIcon='mdi:user' appendInnerIcon='mdi:user'
// />
//* #3: validation using react-hook-form:
// const {control} = useForm<{ val: string }>({
//     mode: 'onSubmit',
//     defaultValues: {val: 'init val'}
// });
// <Controller control={control} name='val' rules={{required: 'required'}}
//     render={({ field, fieldState }) => (
//         <Textfield {...field} label='label' error={!!fieldState.error} helperText={fieldState.error?.message} clearable />
//     )}
// />
