'use client';

import { useRef, useEffect, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/Icon';
import useClient from '@/hooks/useClient';

export type Type = 'info' | 'success' | 'warning' | 'error';
export type Size = 'sm' | 'md' | 'lg';
export type Horizontal = 'left' | 'center' | 'right';
export type Vertical = 'top' | 'center' | 'bottom';
export type Position = `${Horizontal}-${Vertical}`;
export type Options = {
    type: Type;
    show: boolean;
    /** time in milliseconds that which snackbar hides ... pass -1 to disable timer */
    duration?: number;
    position?: Position;
    message: string;
};
type Props = {
    value: boolean;
    onChange?: (newVal: boolean) => void;
    type: Type;
    size?: Size;
    duration?: number;
    position?: Position;
    zIndex?: number;
    closable?: boolean;
    children: ReactNode;
    className?: string;
};

export default function Snackbar({
    value = false,
    onChange,
    type,
    size = 'md',
    /** close duration in milliseconds ... use -1 to disable it */
    duration = 3000,
    position = 'center-bottom',
    zIndex = 3,
    closable = true,
    children,
    className = ''
}: Props) {
    const isClient = useClient();
    const timer = useRef<NodeJS.Timeout>(null!);
    const getPosition = (): CSSProperties => {
        const positionSplit = position.split('-');
        const xAnchor = positionSplit[0] as Horizontal;
        const yAnchor = positionSplit[1] as Vertical;
        let left: undefined | string = undefined;
        let right: undefined | string = undefined;
        let top: undefined | string = undefined;
        let bottom: undefined | string = undefined;
        let translateX: undefined | string = undefined;
        let translateY: undefined | string = undefined;
        if (xAnchor === 'left') left = '2%';
        else if (xAnchor === 'right') right = '2%';
        else if (xAnchor === 'center') {
            left = '50%';
            translateX = '-50%';
        }
        if (yAnchor === 'top') top = '2%';
        else if (yAnchor === 'bottom') bottom = '2%';
        else if (yAnchor === 'center') {
            top = '50%';
            translateY = '-50%';
        }
        return {
            left,
            right,
            top,
            bottom,
            transform: translateX || translateY ? `translate(${translateX || 0}, ${translateY || 0})` : undefined
        };
    };
    const cssPosition = getPosition();
    const hide = () => {
        onChange?.(false);
        clearTimeout(timer.current);
    };
    useEffect(() => {
        if (duration > 0) {
            timer.current = setTimeout(() => {
                hide();
            }, duration);
        }
        return () => {
            clearTimeout(timer.current); //we don't hide snackbar and only reset its timer
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, duration]);

    if (!value || !isClient) return null;

    return createPortal(
        <div
            className={`laptop:max-w-1/2 fixed flex max-w-4/5 items-center justify-between gap-6 rounded-md text-white ${type === 'info' ? 'bg-info' : type === 'success' ? 'bg-success' : type === 'warning' ? 'bg-warning' : 'bg-error'} ${size === 'sm' ? 'text-body-sm px-2 py-1' : size === 'md' ? 'text-body-sm px-4 py-2' : 'text-body-md px-6 py-3'} ${className}`}
            style={{
                ...cssPosition,
                zIndex
            }}
        >
            <p className='grow'>{children}</p>
            {closable && (
                <button className='shrink-0 cursor-pointer' onClick={hide}>
                    <Icon icon='mdi:close' size='sm' color='white' />
                </button>
            )}
        </div>,
        document.querySelector('#portals') as HTMLElement
    );
}

//? Usage:
// const [snackbar, setSnackbar] = useState<Options>({type:'success',show:false,message:'message'});
// <Snackbar
//     value={snackbar.show} onChange={(newVal) => setSnackbar((old) => ({ ...old, show: newVal }))}
//     type={snackbar.type}  duration={-1} zIndex={5} position='center-bottom' closable={true}
// >
//     {snackbar.message}
// </Snackbar>
