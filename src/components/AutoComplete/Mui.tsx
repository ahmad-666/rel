'use client';

import { useState, useId, type FocusEvent, type SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import MuiAutoComplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField'; //for preventing any conflicts we use mui version of Textfield not our own wrapper Textfield
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import MuiInputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@/components/Icon';
import { useTheme, alpha, type SxProps } from '@mui/material/styles';

export type Size = 'sm' | 'md' | 'lg';
export type LabelPos = 'inside' | 'outside';
export type Option = {
    label: string;
    value: number | string;
    [key: string]: unknown;
};
export type Props<
    Value,
    Multiple extends undefined | boolean = false,
    DisableClearable extends undefined | boolean = false,
    FreeSolo extends undefined | boolean = false
    // ChipComponent extends ElementType = 'div' //we don't add this generic because it can slow down whole component(s)
> = Omit<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>, 'size' | 'onChange' | 'renderInput'> &
    Pick<TextFieldProps, 'name' | 'variant' | 'color' | 'placeholder' | 'label' | 'error' | 'helperText'> & {
        size?: Size;
        focused?: boolean;
        bgColor?: string;
        borderColor?: string;
        labelPos?: LabelPos;
        prependInnerIcon?: string;
        appendInnerIcon?: string;
        loading?: boolean;
        clearable?: boolean;
        hideMessage?: boolean;
        onChange?: (
            e: SyntheticEvent,
            newVal: FreeSolo extends false
                ? Multiple extends false
                    ? null | Value
                    : Value[]
                : Multiple extends false
                  ? null | string | Value
                  : (string | Value)[] //--> (FreeSolo extends false) ? (Multiple extends false? null | Value: Value[]) : (Multiple extends false? null | string | Value: (string | Value)[])
        ) => void;
        inputSx?: SxProps;
    };

const AutoComplete = <
    Value,
    Multiple extends undefined | boolean = false,
    DisableClearable extends undefined | boolean = false,
    FreeSolo extends undefined | boolean = false
>({
    id,
    name,
    focused = false,
    variant = 'outlined',
    value,
    onChange,
    multiple,
    size = 'md',
    color = 'primary', //can only consists of main colors like primary,... cannot have variants like primary.light2,...
    bgColor, //css colors or mui colors with variants e.g 'white','neutral.light4',...
    borderColor, //css colors or mui colors with variants e.g 'transparent','neutral.light2'
    placeholder,
    labelPos = 'inside',
    label,
    prependInnerIcon,
    appendInnerIcon,
    loading = false,
    clearable = false,
    readOnly = false,
    disabled = false,
    hideMessage = false,
    error,
    helperText,
    onFocus,
    onBlur,
    slotProps,
    inputSx,
    sx,
    //? Other important props: options,open,onOpen,onCLose,inputValue,onInputChange,blurOnSelect,autoSelect,freeSolo,openOnFocus,clearOnBlur,selectOnFocus,filterSelectedOptions(useful for multiple:true),limitTags,getOptionLabel,renderOption,renderValue,filterOptions
    // getOptionKey={opt=>opt.value} --> set value key of each option ... getOptionLabel={opt => opt.label} --> set label key of each option
    // isOptionEqualToValue={(option, value) => option.value === value.value} --> we must set it for multiple:true we can select duplicated values + filterSelectedOptions prop will not work
    ...rest
}: Props<Value, Multiple, DisableClearable, FreeSolo>) => {
    const theme = useTheme();
    const generatedId = useId().replace(/[:«»]/g, '').toLowerCase();
    const inputId = id || generatedId;
    const [isFocus, setIsFocus] = useState(focused);
    const autoCompleteHeight = size === 'sm' ? 32 : size === 'md' ? 36 : 48;
    const iconSize = size === 'sm' ? 'sm' : 'md';
    const outsideLabelColor = error ? 'error.main' : isFocus ? `${color}.main` : 'neutral.dark4';
    const accentColor = error ? 'error.main' : isFocus ? `${color}.main` : 'neutral.light2';
    const [accentColorName, accentColorVariant] = accentColor.split('.');
    //@ts-expect-error 'manually set palette keys'
    const fadeAccentColor = alpha(theme.palette[accentColorName][accentColorVariant], 0.2);
    const hasValue = !!((!multiple && value) || (multiple && (value as Option[])?.length));
    const showClearBtn = hasValue && clearable;
    const hasStartAdornment = !!prependInnerIcon;
    const hasEndAdornment = !!(appendInnerIcon || loading || showClearBtn);
    const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocus(true);
        onFocus?.(e);
    };
    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocus(false);
        onBlur?.(e);
    };
    const onClearHandler = () => {
        const e = { target: { value: '' } };
        const newVal = !multiple ? null : [];
        //@ts-expect-error 'manually override onChange type'
        onChange?.(e, newVal);
    };

    return (
        <Box sx={{ ...sx }}>
            {!!(label && labelPos === 'outside') && (
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
            <MuiAutoComplete
                id={inputId}
                fullWidth
                value={value}
                //@ts-expect-error 'manually override onChange type'
                onChange={onChange}
                multiple={multiple}
                size={size === 'sm' || size === 'md' ? 'small' : 'medium'}
                loading={loading}
                clearIcon={null}
                readOnly={readOnly}
                disabled={disabled}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                renderInput={(params) => (
                    <MuiTextField
                        {...params}
                        name={name}
                        focused={isFocus} //we add to have focus state in input
                        variant={variant}
                        color={color}
                        placeholder={placeholder}
                        label={label && labelPos === 'inside' ? label : undefined}
                        error={error} //we add to have error state in input
                        // helperText={helperText} //we use separate component for it
                        slotProps={{
                            input: {
                                ...params.InputProps, //? we MUST use it else options menu will not work
                                startAdornment: !!(hasStartAdornment || params.InputProps.startAdornment) ? (
                                    <>
                                        {hasStartAdornment ? (
                                            <MuiInputAdornment
                                                position='start'
                                                sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 0 }}
                                            >
                                                {prependInnerIcon && (
                                                    <Icon
                                                        icon={prependInnerIcon!}
                                                        size={iconSize}
                                                        color={accentColor}
                                                        className='pointer-events-none'
                                                    />
                                                )}
                                            </MuiInputAdornment>
                                        ) : null}
                                        {params.InputProps.startAdornment}
                                        {/* add custom renderValue prop */}
                                    </>
                                ) : null,
                                endAdornment: !!(hasEndAdornment || params.InputProps.endAdornment) ? (
                                    <>
                                        {hasEndAdornment ? (
                                            <MuiInputAdornment
                                                position='end'
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    ml: 0,
                                                    position: 'absolute',
                                                    right: 38,
                                                    top: '50%',
                                                    transform: 'translate(0,-50%)'
                                                }}
                                            >
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
                                                {!!appendInnerIcon && (
                                                    <Icon
                                                        icon={appendInnerIcon}
                                                        size={iconSize}
                                                        color={accentColor}
                                                        className='pointer-events-none'
                                                    />
                                                )}
                                            </MuiInputAdornment>
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                        {/* add default Autocomplete arrow for options menu */}
                                    </>
                                ) : null
                            },
                            ...slotProps
                        }}
                    />
                )}
                sx={{
                    opacity: disabled ? 0.5 : 1,
                    pointerEvents: readOnly || disabled ? 'none' : 'auto',
                    '& .MuiFormControl-root .MuiInputBase-root': {
                        minHeight: autoCompleteHeight,
                        height: autoCompleteHeight,
                        borderRadius: 2,
                        bgcolor: bgColor,
                        gap: 1, //add spacing for times we use multiple:true and load multiple values as tags,chips,...
                        input: {
                            typography: 'bodySm',
                            color: 'neutral.dark4',
                            px: 2,
                            py: 0,
                            '&::placeholder': {
                                typography: 'labelMd',
                                color: 'neutral.light1',
                                opacity: 1
                            }
                        },
                        '& .MuiChip-root': {
                            m: 0 //remove extra spacing between chips for multiple:true(we use gap for values spacing ... see above)
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
};

export default AutoComplete;

//? Examples:
//* #1:Single Select with important props and controlled version of menu,textfield:
// const [menu, setMenu] = useState(false);
// const [search, setSearch] = useState('');
// const [skill, setSkill] = useState<null | Option>(null);
// const [isError, setIsError] = useState(false);
// const skillOptions: Option[] = [
//     { value: 'html', label: 'HTML', desc: 'desc-1' },
//     { value: 'css', label: 'CSS', desc: 'desc-2' }
// ];
// <button onClick={() => setIsError((old) => !old)}>toggle error</button>
// <AutoComplete variant='outlined' size='sm' label='my label' color='success' options={skillOptions}
//     value={skill} onChange={(e, value) => setSkill(value)}
//     inputValue={search} onInputChange={(e, newValue) => setSearch(newValue)}
//     open={menu} onOpen={() => setMenu(true)} onClose={() => setMenu(false)}
//     loading clearable prependInnerIcon='mdi:user' appendInnerIcon='mdi:user'
//     error={isError} helperText='text'
//     renderOption={(props, option, state, ownerState) => {
//         const { key, ...rest } = props;
//         return (
//             <ListItem key={key} {...rest}>
//                 {option.label} - something
//             </ListItem>
//         );
//     }}
//     renderValue={(value, getItemProps, ownerState) => {
//         return <Chip label={value.label} {...getItemProps()} />;
//     }}
//     sx={{ width: 500, mt: 10 }}
// />
//* #2:Multiple Select with custom jsx:
// const [skills, setSkills] = useState<Option[]>([]);
// const skillOptions: Option[] = [
//     { value: 'html', label: 'HTML', desc: 'desc-1' },
//     { value: 'css', label: 'CSS', desc: 'desc-2' }
// ];
// <AutoComplete multiple size='lg'filterSelectedOptions
//     isOptionEqualToValue={(option, value) => option.value === value.value} //if we don't set this prop we can select duplicate options so for multiple:true we must set it
//     value={skills} onChange={(e, value) => setSkills(value)} options={skillOptions} placeholder='My Label'
//     clearable loading
//     renderOption={(props, option, state, ownerState) => {
//         const { key, ...rest } = props;
//         return (
//             <ListItem key={key} {...rest}>
//                 {option.label}
//             </ListItem>
//         );
//     }}
//     renderValue={(value, getItemProps, ownerState) =>
//         value.map((val, index) => {
//             const { key, ...rest } = getItemProps({ index });
//             return <Chip key={key} {...rest} label={val.label} />;
//         })
//     }
//     sx={{ '& .MuiInputBase-root': { height: 'auto !important' } }} //add auto height
// />
//* #3: Validation with react-hook-form:
// type Fields = { skill: null | Option };
// const skillOptions: Option[] = [
//     { value: 'html', label: 'HTML', desc: 'desc-1' },
//     { value: 'css', label: 'CSS', desc: 'desc-2' }
// ];
// const { control } = useForm<Fields>({ mode: 'onSubmit', defaultValues: { skill: null } });
// <Controller control={control} name='skill' rules={{ required: 'required skill' }}
//     render={({ field, fieldState: { error } }) => (
//         <AutoComplete {...field} onChange={(_, newVal) => field.onChange(newVal || null)}
//             options={skillOptions} clearable error={!!error} helperText={error?.message}
//         />
//     )}
// />
