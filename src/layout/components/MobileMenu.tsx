'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import useStore from '@/store';

//* Types ..................................
type NavbarLinkType = {
    name: string;
    href: string;
    isNew?: boolean;
};

type MobileMenuProps = {
    show: boolean;
    items: NavbarLinkType[];
    hideBodyScroll?: boolean;
    animation?: 'none' | 'fade' | 'expand';
    className?: string;
};

//* Component ..............................
const MobileMenu = ({
    show = false,
    items = [],
    hideBodyScroll = true,
    animation = 'none',
    className = ''
}: MobileMenuProps) => {
    const isLoggedIn = useStore((state) => state.isLoggedIn());
    useEffect(() => {
        if (hideBodyScroll) {
            document.body.style.overflow = show ? 'hidden' : 'initial';
        }
    }, [show, hideBodyScroll]);

    if (!show) return null;
    return (
        <div
            className={`border-neutral-light3 flex h-full w-full flex-col justify-between gap-4 overflow-auto rounded-none border-t border-solid bg-white px-4 pt-6 pb-8 ${animation === 'fade' ? 'animate-fade-in' : ''} ${animation === 'expand' ? 'animate-expand-y-in' : ''} ${className}`}
        >
            <nav>
                <ul className='divide-neutral-light3 divide-y divide-solid'>
                    {items.map((item) => (
                        <li key={item.name} className='py-5 first:pt-0 last:pb-0'>
                            <Link href={item.href} className='text-label-lg text-neutral-dark4'>
                                {item.name}
                            </Link>
                            {item.isNew && (
                                <Badge variant='fill' color='success-dark4' size='md' text='New' className='ml-1' />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            {!isLoggedIn && (
                <div className='flex justify-between gap-8'>
                    <Button
                        variant='fill'
                        size='lg'
                        color='white'
                        href='/login'
                        queryParams={{ cta_widget: 'landing-mobile-menu-login' }}
                        className='!text-neutral-dark4 w-36 whitespace-nowrap'
                    >
                        Log in
                    </Button>
                    <Button
                        variant='fill'
                        size='lg'
                        color='primary'
                        href='/signup'
                        queryParams={{ cta_widget: 'landing-mobile-menu-signup' }}
                        className='w-36 whitespace-nowrap'
                    >
                        {isLoggedIn ? (
                            <div className='flex items-center gap-2'>
                                <Icon icon='ph:user-circle-fill' size='md' color='white' />
                                <span className='capitalize'>dashboard</span>
                            </div>
                        ) : (
                            'Sign up for free'
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
