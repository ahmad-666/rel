'use client';

import { useRef, useEffect, useCallback, type ReactNode } from 'react';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import useColor from '@/hooks/useColor';

export type Size = 'sm' | 'md' | 'lg';
type AlertProps = {
    show: boolean;
    onChange?: (newShow: boolean) => void;
    color?: string;
    closeColor?: string;
    size?: Size;
    closable?: boolean;
    timeout?: number;
    children?: ReactNode;
    contentClassName?: string;
    closeBtnClassName?: string;
    className?: string;
};

export default function Alert({
    show,
    onChange,
    color = 'primary',
    closeColor = 'white',
    size = 'md',
    closable = false,
    timeout = -1, //use -1 for not having any timeout and position values for setting timeout
    children,
    contentClassName = '',
    closeBtnClassName = '',
    className = ''
}: AlertProps) {
    const timer = useRef<NodeJS.Timeout>(null!);
    const parsedColor = useColor(color);
    const closeAlert = useCallback(() => {
        if (onChange) onChange(false);
    }, [onChange]);
    useEffect(() => {
        if (timeout > 0) {
            timer.current = setTimeout(() => {
                closeAlert();
            }, timeout);
            return () => {
                clearTimeout(timer.current);
            };
        }
    }, [timeout, closeAlert]);
    if (!show) return null;

    return (
        <div
            className={`inline-block animate-fade-in overflow-hidden rounded ${size === 'sm' ? 'px-4 py-1.5' : ''} ${size === 'md' ? 'px-4 py-3' : ''} ${size === 'lg' ? 'px-4 py-5' : ''} ${className}`}
            style={{ backgroundColor: parsedColor }}
        >
            <div className={`flex items-center gap-5 ${contentClassName}`}>
                <div className='text-lg grow'>{children}</div>
                {closable && (
                    <Button
                        variant='text'
                        hover={false}
                        press={false}
                        onClick={closeAlert}
                        className={`shrink-0 !p-0 ${closeBtnClassName}`}
                    >
                        <Icon icon='basil:cross-solid' size='lg' color={closeColor} />
                    </Button>
                )}
            </div>
        </div>
    );
}
