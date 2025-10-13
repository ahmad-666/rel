import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { type LinkItemType } from '@layout/components/footer';

//* Types -----------------------------
type Props = {
    className?: string;
    socials: LinkItemType[];
};

//* Component -------------------------
const FooterBrand = ({ socials, className = '' }: Props) => {
    return (
        <div className={`flex flex-col gap-5 ${className}`}>
            <Link href='/' aria-label='reverse-email-lookup-logo' className='flex shrink-0 items-center gap-2'>
                <Image
                    priority
                    src='/imgs/logos/logo.svg'
                    alt='reverse-email-lookup-logo'
                    width={34}
                    height={34}
                    quality={100}
                />
                <span className='text-[1.375rem] font-bold text-white'>Reverse Email Lookup</span>
            </Link>
            <p className='text-body-sm text-neutral max-w-[355px]'>
                Reverse Email Lookup helps you turn a single email address into a complete contact profile. Perfect for
                outreach.
            </p>
            <ul className='flex flex-wrap items-end gap-2'>
                {socials.map(
                    (social) =>
                        social.icon && (
                            <li key={social.name}>
                                <Link target='_blank' href={social.href} rel='noopener noreferrer'>
                                    <Icon
                                        icon={social.icon}
                                        color='neutral'
                                        className='!pointer-events-auto h-5 w-5 hover:!text-white'
                                    />
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

export default FooterBrand;
