import { type ReactNode } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';

//* Types -------------------------
type Props = {
    title?: string;
    description?: string;
    children?: ReactNode;
    cardItemsJSX?: ReactNode;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Constants -------------------------
const cardItems = (
    <>
        <p className='text-title-md text-neutral-dark4'>
            “ Help businesses of all sizes access reliable contact data without wasting credits or budget ”
        </p>
        <p className='text-body-md text-neutral mt-8'>
            At Reverse Email Lookup, we believe that finding out who’s behind an email address shouldn’t be complicated,
            expensive, or risky. We’re a small, focused team with a big mission.
        </p>
    </>
);

//* Component -------------------------
const AboutHero = ({
    title = 'We Make Contact Data Simple, Fair, and Accessible.',
    description,
    children,
    cardItemsJSX = cardItems,
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    const cardGradientClass = `bg-[linear-gradient(90deg,_rgba(138,223,255,0.12)_0%,_rgba(194,116,255,0.12)_33.1%,_rgba(255,102,154,0.12)_62.33%,_rgba(251,178,48,0.12)_100%)]`;
    return (
        <header className={`relative ${className}`}>
            <Image
                src='/imgs/patterns/gradient-ltr.png'
                alt='background-gradient'
                width={700}
                height={900}
                loading='lazy'
                className='tablet:w-[550px] tablet:h-[500px] absolute top-0 left-0 -z-10 h-[350px] w-[250px]'
            />
            <Container>
                <div className='laptop:flex-row flex flex-col items-center justify-between gap-x-28 pt-40 pb-16'>
                    <div className='laptop:text-start w-full text-center'>
                        <h1 className={`text-display-sm text-neutral-dark4 ${titleClassName}`}>{title}</h1>
                        {!!description && (
                            <p className={`text-body-md text-neutral-dark2 mt-8 ${descriptionClassName}`}>
                                {description}
                            </p>
                        )}
                        {children}
                    </div>
                    <div
                        className={`max-w-mobile laptop:mt-0 border-neutral-light2 relative mt-16 w-full rounded-xl border p-6 ${cardGradientClass}`}
                    >
                        {cardItemsJSX}
                        <Image
                            src='/imgs/others/our-mission.png'
                            alt='about-hero-image'
                            width={100}
                            height={100}
                            loading='lazy'
                            className='tablet:block absolute -top-7 -left-25 hidden'
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default AboutHero;
