'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Container from '@/components/Container';
import MobileMenu from '@/layout/components/MobileMenu';
import useBreakpoint from '@/hooks/useBreakpoint';
import useStore from '@/store';

//* Types --------------------------
type NavbarProps = {
    className?: string;
};

type NavbarLinkType = {
    name: string;
    href: string;
    target?: string;
    isNew?: boolean;
};

//* Values -------------------------
const navbarLinks: NavbarLinkType[] = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Pricing',
        href: '/pricing'
    },
    {
        name: 'Blog',
        href: 'https://reverseemaillookup.net/blog'
    },
    {
        name: 'Google Sheets Add-on',
        href: 'https://gsuite.google.com/marketplace/app/foo/842624082347',
        target: '_blank',
        isNew: true
    }
];

//* Components -------------------------
const Navbar = ({ className = '' }: NavbarProps) => {
    const { laptopAndLower } = useBreakpoint();
    const pathname = usePathname();
    const isLoggedIn = useStore((state) => state.isLoggedIn());
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [mounted, setMounted] = useState(false);

    const scrollHandler = useCallback(() => {
        setScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        scrollHandler();
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

    // Default to desktop view during SSR to prevent hydration mismatch
    const isLaptopAndLower = mounted ? laptopAndLower : false;
    return (
        <header
            className={`fixed top-0 left-0 flex w-full flex-col ${mobileMenu ? 'z-[calc(infinity)] h-full' : 'z-50 h-auto'} ${className}`}
        >
            <div
                className={`transition-all duration-300 ${mobileMenu ? 'bg-white' : 'bg-transparent'} ${scrolled && !mobileMenu ? 'animate-fade-in-down bg-white/40 backdrop-blur-sm' : ''}`}
            >
                <Container>
                    <div className='tablet:py-9 flex items-center justify-between gap-4 py-6'>
                        <Link
                            aria-label='reverse-email-lookup-logo'
                            href='/'
                            className='desktop:w-72 flex shrink-0 items-center gap-2'
                        >
                            <Image
                                priority
                                src='/imgs/logos/logo.svg'
                                alt='reverse-email-lookup-logo'
                                width={34}
                                height={34}
                                quality={100}
                            />
                            <span className='text-neutral-dark4 tablet:block hidden text-[1.375rem] font-bold'>
                                Reverse Email Lookup
                            </span>
                        </Link>
                        <nav className='laptop:block hidden'>
                            <ul className='flex h-full items-center gap-12'>
                                {navbarLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            target={link.target}
                                            className='text-label-lg text-neutral-dark4'
                                        >
                                            {link.name}
                                        </Link>
                                        {link.isNew && (
                                            <Badge
                                                variant='fill'
                                                color='success-dark4'
                                                size='md'
                                                text='New'
                                                className='ml-1'
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className='desktop:w-72 flex items-center justify-end gap-3'>
                            {!isLoggedIn && (
                                <Button
                                    variant='fill'
                                    size='sm'
                                    textSize='lg'
                                    color='transparent'
                                    href='/login'
                                    queryParams={{ cta_widget: 'landing-top-menu-login' }}
                                    className='!text-neutral-dark4 laptop:!inline-flex !hidden whitespace-nowrap'
                                >
                                    Log in
                                </Button>
                            )}
                            <Button
                                variant='fill'
                                size={isLaptopAndLower ? 'lg' : 'sm'}
                                textSize={isLaptopAndLower ? 'lg' : 'md'}
                                color='primary'
                                href={`${isLoggedIn ? '/dashboard' : '/signup'}`}
                                queryParams={isLoggedIn ? undefined : { cta_widget: 'landing-top-menu-signup' }}
                                className='whitespace-nowrap'
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
                            <Button
                                variant='text'
                                color='neutral'
                                size='sm'
                                hover={false}
                                press={false}
                                className='laptop:hidden inline-block !p-0'
                                onClick={() => setMobileMenu((old) => !old)}
                            >
                                <Icon
                                    icon={mobileMenu ? 'basil:cross-solid' : 'basil:menu-solid'}
                                    size='xl'
                                    color='neutral-dark4'
                                />
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
            <MobileMenu show={mobileMenu} items={navbarLinks} animation='fade' hideBodyScroll />
        </header>
    );
};

export default Navbar;
