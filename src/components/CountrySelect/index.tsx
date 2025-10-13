'use client';

import React, { useState, useRef, RefObject, useEffect } from 'react';
import Icon from '@/components/Icon';
import Textfield from '@/components/Textfield';
import countries from '@/data/countries.json';
import { useOutsideClick } from '@/hooks/useOutsideClick';

//* Types -----------------------------
interface CountryOption {
    value: string;
    name: string;
    code: string;
}

interface CountrySelectProps {
    value: string;
    onChange?: (newVal: string) => void;
    className?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
}

//* Utils -----------------------------
const transformCountriesToOptions = (): CountryOption[] => {
    return countries.map((country) => ({
        value: country.code,
        name: country.name,
        code: country.code
    }));
};

const filterOptions = (options: CountryOption[], searchValue: string): CountryOption[] => {
    const searchLower = searchValue.toLowerCase();
    return options.filter(
        (option) => option.name.toLowerCase().includes(searchLower) || option.code.toLowerCase().includes(searchLower)
    );
};

//* Component -------------------------
const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange,
    className = '',
    placeholder = 'Enter country name...',
    size = 'sm'
}) => {
    //* States
    const [isOpen, setIsOpen] = useState(false);
    const [hasScroll, setHasScroll] = useState(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string>(value);

    //* Refs
    const selectRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    //* Hooks
    useOutsideClick(selectRef as RefObject<HTMLElement>, () => setIsOpen(false));

    //* Computed values
    const options = transformCountriesToOptions();
    const filteredOptions = filterOptions(options, searchValue);

    //* Handlers
    const handleToggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onChange?.(value);
        setIsOpen(false);
        setSearchValue(''); // Reset search when selecting
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchValue(e.target.value);
    };

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight, scrollTop } = scrollContainerRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            setHasScroll(scrollHeight > clientHeight && !isAtBottom);
        }
    };

    //* Effects
    useEffect(() => {
        checkScroll();
    }, [filteredOptions]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const sizeStyles = {
        sm: 'h-9 w-[90px] text-label-lg',
        md: 'h-10 w-[110px] text-body-md',
        lg: 'h-11 w-[130px] text-body-lg'
    };

    //* Render helpers
    const renderSearchInput = () => (
        <div className='flex items-center pb-3'>
            <Icon
                icon='iconamoon:search'
                size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
                color='neutral-dark4'
            />
            <Textfield
                size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
                value={searchValue}
                onChange={handleSearchChange}
                clearable
                placeholder={placeholder}
                inputClassName='border-0 placeholder:text-body-md'
            />
        </div>
    );

    const renderOption = (option: CountryOption) => (
        <div
            key={option.value}
            className={`hover:bg-neutral-light5 text-neutral-dark4 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 ${
                selectedValue === option.value ? 'bg-neutral-light5' : ''
            }`}
            onClick={() => handleSelect(option.value)}
        >
            <Icon icon={`flag:${option.value.toLowerCase()}-4x3`} className='size-7 shrink-0' />
            <span
                className={`${size === 'sm' ? 'text-label-md' : size === 'md' ? 'text-body-md' : 'text-body-lg'} capitalize`}
            >
                {option.name}
            </span>
        </div>
    );

    const renderDropdown = () =>
        isOpen && (
            <div
                key='country-select-options'
                className='animate-fade-in border-neutral-light2 divide-neutral-light3 mobile:p-5 absolute top-full left-0 mt-1 w-full divide-y overflow-hidden rounded-lg border border-solid bg-white p-3 shadow-md'
            >
                {renderSearchInput()}
                <div className='relative'>
                    <div ref={scrollContainerRef} className='mt-4 max-h-56 overflow-auto pr-2' onScroll={checkScroll}>
                        {filteredOptions.map(renderOption)}
                        {filteredOptions.length === 0 && (
                            <div className='text-body-md text-neutral-dark4 text-center'>No result found</div>
                        )}
                    </div>
                    {hasScroll && (
                        <div className='absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-white to-transparent' />
                    )}
                </div>
            </div>
        );

    // add position relative to the parent of component and add top class to the renderDropdown
    return (
        <div className={`${className}`} ref={selectRef}>
            <div
                className='mobile:gap-3.5 flex w-full cursor-pointer appearance-none items-center justify-between gap-2'
                onClick={handleToggleDropdown}
            >
                <div
                    className={`bg-neutral-light4 relative flex cursor-pointer appearance-none items-center justify-between rounded-md px-3 py-2 ${sizeStyles[size]}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1'>
                            <Icon
                                icon={`flag:${selectedValue.toLowerCase()}-4x3`}
                                size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
                                className='shrink-0'
                            />
                            <span className={`uppercase`}>
                                {options.find((opt) => opt.value === selectedValue)?.code || value.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <Icon
                        icon='iconamoon:arrow-down-2-light'
                        size={size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}
                        color='neutral-dark4'
                        className={`pointer-events-none transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>
            {renderDropdown()}
        </div>
    );
};

export default CountrySelect;
