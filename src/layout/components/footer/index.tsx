import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import List from '@layout/components/footer/List';
import Brand from '@layout/components/footer/Brand';
import FreeTrialBanner from '@landing/components/FreeTrialBanner';

//* Types -----------------------------
export type LinkItemType = {
    name: string;
    href: string;
    icon?: string;
    target?: string;
};

type FooterListType = {
    title: string;
    description?: string;
    links?: LinkItemType[];
};

//* Constants -------------------------
const footerLinks: FooterListType[] = [
    {
        title: 'Product',
        links: [
            {
                name: 'Reverse Email Lookup API',
                href: '/reverse-email-lookup-api'
            },
            {
                name: 'Google Sheets Add-on',
                href: 'https://workspace.google.com/marketplace/app/reverse_email_lookup/842624082347',
                target: '_blank'
            },
            {
                name: 'Zapier Integration',
                href: 'https://zapier.com/apps/reverse-email-lookup/integrations',
                target: '_blank'
            },
            {
                name: 'Pricing',
                href: '/pricing'
            }
        ]
    },
    {
        title: 'Resources',
        links: [
            {
                name: 'Blog',
                href: 'https://reverseemaillookup.net/blog'
            },
            {
                name: 'About Us',
                href: '/about-us'
            },
            {
                name: 'Reverse Email Lookup Use Cases',
                href: 'https://reverseemaillookup.net/blog/40-powerful-reverse-email-lookup-use-cases-for-modern-business/'
            },
            {
                name: 'G2 Reviews',
                href: 'https://www.g2.com/products/reverse-email-lookup/reviews',
                target: '_blank'
            }
        ]
    },
    {
        title: 'Headquarter',
        description: 'HUB SPOTBUSINESS BAYNA, Dubai, UAE'
    }
];

const socials: LinkItemType[] = [
    {
        name: 'linkedin',
        href: 'https://www.linkedin.com/company/reverse-email-lookup/',
        icon: 'ant-design:linkedin-filled'
    },
    // ,{
    //     name: 'facebook',
    //     href: '',
    //     icon: 'simple-icons:facebook'
    // }
    {
        name: 'twitter',
        href: 'https://x.com/reverseemailnet',
        icon: 'ant-design:twitter-square-filled'
    },
    {
        name: 'youtube',
        href: 'https://www.youtube.com/@ReverseEmailLookup',
        icon: 'tdesign:logo-youtube-filled'
    },
    {
        name: 'facebook',
        href: 'https://facebook.com/reverseemaillookup',
        icon: 'tdesign:logo-facebook-filled'
    },
    {
        name: 'instagram',
        href: 'https://www.instagram.com/reverseemaillookup/',
        icon: 'tdesign:logo-instagram-filled'
    }
];

const legalLinks: LinkItemType[] = [
    {
        name: 'Privacy Policy',
        href: '/privacy-policy'
    },

    {
        name: 'Terms',
        href: '/terms'
    },
    {
        name: 'Glossary',
        href: '/glossary'
    }
];

//* Component -------------------------
const Footer = ({ className = '' }: { className?: string }) => {
    return (
        <footer className={`divide-neutral-dark3 relative divide-y overflow-hidden ${className}`}>
            <FreeTrialBanner />
            <div className='bg-neutral-dark4'>
                <Container>
                    <div className='tablet:pt-28 tablet:pb-40 relative pt-8 pb-16'>
                        <div className='tablet:flex-row tablet:gap-12 z-10 flex flex-col flex-wrap justify-between gap-8'>
                            <Brand socials={socials} />
                            {footerLinks.map((section) => (
                                <List
                                    key={section.title}
                                    title={section.title}
                                    links={section.links}
                                    description={section.description}
                                />
                            ))}
                        </div>
                        <ul className='mt-16 flex gap-16'>
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className='text-label-md text-neutral transition-colors duration-150 hover:text-white'
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Image
                            src='/imgs/home/reverse-email-lookup.png'
                            alt='reverse-email-lookup'
                            width={1500}
                            height={800}
                            loading='lazy'
                            className='absolute bottom-0 left-0'
                        />
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
