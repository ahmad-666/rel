import Button from '@/components/Button';

//* Types -----------------------------
type Props = {
    title: string;
    isLoggedIn: boolean;
    btnText?: string;
    titleClassName?: string;
    className?: string;
};

//* Component -------------------------
const Banner = ({ title, isLoggedIn, btnText = 'Sign up for free', titleClassName = '', className = '' }: Props) => {
    return (
        <div className={`from-neutral-dark4 to-brown rounded-2xl bg-gradient-to-r p-8 text-center ${className}`}>
            <p className={`text-headline-md text-center text-white ${titleClassName}`}>{title}</p>
            <Button
                variant='fill'
                color='white'
                size='md'
                href={`${isLoggedIn ? '/dashboard' : '/signup'}`}
                queryParams={isLoggedIn ? undefined : { cta_widget: 'landing-banner-signup' }}
                className='!text-neutral-dark4 border-neutral-light2 mt-6 border border-solid'
            >
                {btnText}
            </Button>
        </div>
    );
};

export default Banner;
