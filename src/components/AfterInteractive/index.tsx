'use client';

import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';

type Props = {
    /** render children after mouse move */
    mouseMove?: boolean;
    /** render children after click */
    click?: boolean;
    /** render children after jey press */
    keyPress?: boolean;
    /** render children after scroll */
    scroll?: boolean;
    /** render children after resize */
    resize?: boolean;
    /** render children after certain time(in milliseconds) */
    timeout?: number;
    /** main content */
    children: ReactNode;
};

export default function AfterInteractive({
    mouseMove = true,
    click = true,
    keyPress = true,
    scroll = true,
    resize = false,
    timeout = 5000,
    children
}: Props) {
    const [render, setRender] = useState(false);
    const timerRef = useRef<null | NodeJS.Timeout>(null);
    const renderChildren = useCallback(() => {
        setRender(true);
    }, []);
    useEffect(() => {
        if (mouseMove) addEventListener('mousemove', renderChildren);
        if (click) addEventListener('click', renderChildren);
        if (keyPress) addEventListener('keypress', renderChildren);
        if (scroll) addEventListener('scroll', renderChildren);
        if (resize) addEventListener('resize', renderChildren);
        if (timeout > 0) timerRef.current = setTimeout(renderChildren, timeout);
        return () => {
            removeEventListener('mousemove', renderChildren);
            removeEventListener('click', renderChildren);
            removeEventListener('keypress', renderChildren);
            removeEventListener('scroll', renderChildren);
            removeEventListener('resize', renderChildren);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [mouseMove, click, keyPress, scroll, resize, timeout, renderChildren]);

    if (!render) return null;
    return children;
}
