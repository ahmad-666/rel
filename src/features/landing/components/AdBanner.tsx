import Image from 'next/image';
import Button from '@/components/Button';
import Container from '@/components/Container';

//* Types -------------------------
type Props = {
    title?: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Component -------------------------
const AdBanner = ({
    title = 'Let’s Grow Together',
    description = 'We’re not trying to be the biggest — just the most helpful in the game. Join us and see how clean, fair contact lookup should feel.',
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    return (
        <Container>
            <div
                className={`bg-neutral-dark4 border-neutral-dark3 tablet:p-12 relative rounded-2xl border p-5 text-center ${className}`}
            >
                <Image
                    src='/imgs/patterns/ad-banner-gradient.png'
                    alt='background-gradient'
                    width={800}
                    height={800}
                    loading='lazy'
                    className='absolute bottom-0 left-0'
                />
                <div className='relative z-10'>
                    <h2 className={`text-headline-lg text-white ${titleClassName}`}>{title}</h2>
                    <p
                        className={`text-body-md text-neutral-light1 mx-auto mt-8 max-w-[550px] ${descriptionClassName}`}
                    >
                        {description}
                    </p>
                    <Button
                        variant='fill'
                        size='md'
                        color='primary'
                        href='/signup'
                        queryParams={{ cta_widget: 'ad-banner-section' }}
                        className='text-label-lg bg-primary mt-8 whitespace-nowrap text-white'
                    >
                        Start Your Free Trial
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default AdBanner;
