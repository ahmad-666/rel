import { type ReactNode } from 'react';
import Button from '@/components/Button';
import Container from '@/components/Container';

//* Types -----------------------------
type Props = {
    bannerText?: ReactNode;
    className?: string;
    bannerTextClassName?: string;
};

//* Component -------------------------
const FreeTrialBanner = ({ bannerText = '', className = '', bannerTextClassName = '' }: Props) => {
    return (
        <div className={`to-neutral-dark4 from-brown relative z-10 w-full bg-gradient-to-b py-16 ${className}`}>
            <Container>
                <div className='tablet:flex-row flex flex-col items-center justify-between gap-8'>
                    <p className={`text-headline-lg tablet:text-start text-center text-white ${bannerTextClassName}`}>
                        {bannerText || (
                            <>
                                Start <span className='text-primary-light2'>Free</span> on Reverse Email Lookup and{' '}
                                <span className='text-primary-light2'>Get 15 Free Credits</span>
                            </>
                        )}
                    </p>
                    <Button
                        href='/signup'
                        queryParams={{ cta_widget: 'free-trial-banner' }}
                        variant='fill'
                        color='primary'
                        className='shrink-0'
                    >
                        Try with 15 Free Credits
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default FreeTrialBanner;
