'use client';

import React, { useState, useId, useMemo, type FocusEvent, type ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from '@/components/Icon';

//* Types -----------------------------
type As = 'textfield' | 'textarea';
type Size = 'sm' | 'md' | 'lg';
type Color = 'primary' | 'error';
type LabelPos = 'inside' | 'outside';

type Props = {
    as?: As;
    id?: string;
    type?: string;
    value?: string;
    onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    label?: string;
    labelPos?: LabelPos;
    size?: Size;
    color?: Color;
    bgColor?: string;
    borderColor?: string;
    textColorClassName?: string;
    readOnly?: boolean;
    disabled?: boolean;
    loading?: boolean;
    clearable?: boolean;
    hideMessage?: boolean;
    prependInnerIcon?: React.ReactNode;
    appendInnerIcon?: React.ReactNode;
    button?: React.ReactNode;
    error?: boolean;
    helperText?: string;
    className?: string;
    inputClassName?: string;
};

//* Component -------------------------
const Textfield: React.FC<Props> = ({
    as = 'textfield',
    id,
    type = 'text',
    value = '',
    onChange,
    onFocus,
    onBlur,
    placeholder,
    label,
    labelPos = 'inside',
    size = 'md',
    color = 'primary',
    bgColor = 'transparent',
    borderColor = 'border-gray-200',
    textColorClassName = 'text-neutral-dark4',
    readOnly = false,
    disabled = false,
    loading = false,
    clearable = false,
    prependInnerIcon,
    appendInnerIcon,
    button,
    hideMessage = false,
    error = false,
    helperText,
    className = '',
    inputClassName = ''
}) => {
    //* States
    const generatedId = useId().replace(/[:«»]/g, '').toLowerCase();
    const inputId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);

    //* Computed Values
    const hasValue = !!value;

    const sizeStyles = useMemo(
        () => ({
            sm: 'h-7 text-body-sm placeholder:text-body-sm',
            md: 'h-9 text-body-md placeholder:text-body-md',
            lg: 'h-11 text-body-lg placeholder:text-body-lg'
        }),
        []
    );

    const colorStyles = useMemo(
        () => ({
            primary: error ? 'border-error' : isFocused ? 'border-primary' : borderColor,
            error: 'border-error'
        }),
        [error, isFocused, borderColor]
    );

    const labelColor = useMemo(
        () => twMerge(error ? 'text-error' : isFocused ? 'text-primary' : 'text-neutral-dark4'),
        [error, isFocused]
    );

    const inputClasses = useMemo(
        () =>
            twMerge(
                'w-full rounded-md border px-3 py-2 outline-none transition-all truncate',
                textColorClassName,
                sizeStyles[size],
                colorStyles[color],
                bgColor === 'transparent' ? 'bg-transparent' : `bg-${bgColor}`,
                disabled ? 'opacity-50 cursor-not-allowed' : '',
                readOnly ? 'cursor-default' : '',
                prependInnerIcon ? 'pl-10' : '',
                appendInnerIcon || loading || clearable ? 'pr-10' : '',
                inputClassName
            ),
        [
            textColorClassName,
            size,
            color,
            bgColor,
            disabled,
            readOnly,
            prependInnerIcon,
            appendInnerIcon,
            loading,
            clearable,
            inputClassName,
            sizeStyles,
            colorStyles
        ]
    );

    //* Handlers
    const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!disabled && !readOnly) {
            setIsFocused(true);
            onFocus?.(e);
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!disabled && !readOnly) {
            onChange?.(e);
        }
    };

    const handleClear = () => {
        if (!disabled && !readOnly && clearable) {
            onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && as === 'textarea') {
            e.preventDefault(); // Prevent form submission
        }
        if (e.key === 'Escape' && clearable && hasValue) {
            handleClear();
        }
    };

    //* Render
    return (
        <div className={twMerge('w-full', className)} role='group'>
            {labelPos === 'outside' && label && (
                <label htmlFor={inputId} className={twMerge('text-label-md mb-2 block font-medium', labelColor)}>
                    {label}
                </label>
            )}

            <div className='relative'>
                {prependInnerIcon && <div className='absolute top-1/2 left-3 -translate-y-1/2'>{prependInnerIcon}</div>}

                {as === 'textarea' ? (
                    <textarea
                        id={inputId}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        placeholder={labelPos === 'inside' && label ? label : placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        className={inputClasses}
                        aria-invalid={error}
                        aria-describedby={helperText && !hideMessage ? `${inputId}-helper` : undefined}
                        rows={size === 'sm' ? 3 : size === 'md' ? 4 : 5}
                    />
                ) : (
                    <input
                        id={inputId}
                        type={type}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        placeholder={labelPos === 'inside' && label ? label : placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        className={inputClasses}
                        aria-invalid={error}
                        aria-describedby={helperText && !hideMessage ? `${inputId}-helper` : undefined}
                    />
                )}

                <div className='absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1.5'>
                    {loading && (
                        <div
                            className={twMerge(
                                'h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent',
                                textColorClassName
                            )}
                        />
                    )}
                    {clearable && hasValue && !disabled && !readOnly && (
                        <button
                            type='button'
                            onClick={handleClear}
                            className='cursor-pointer p-1 hover:opacity-80 focus:outline-none'
                            aria-label='Clear input'
                        >
                            <Icon icon='iconamoon:close' size='sm' className={textColorClassName} />
                        </button>
                    )}
                    {appendInnerIcon}
                    {button}
                </div>
            </div>

            {!hideMessage && helperText && (
                <p
                    id={`${inputId}-helper`}
                    className={twMerge('text-body-sm mt-1', labelColor)}
                    role='alert'
                    aria-live={error ? 'assertive' : 'polite'}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default Textfield;
