'use client';

import Image from 'next/image';
import useBreakpoint from '@/hooks/useBreakpoint';
import Button from '@/components/Button';

//* Types -----------------------------
type Props = {
    title: string;
    description: string;
    imageSrc: string;
    btnHref?: string;
    btnText?: string;
    layout?: 'row' | 'column';
    className?: string;
    imageClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    boxedImage?: boolean;
};

//* Component -------------------------
const InfoCard = ({
    title,
    description,
    imageSrc,
    layout = 'column',
    btnHref,
    btnText,
    className = '',
    imageClassName = '',
    titleClassName = '',
    descriptionClassName = '',
    boxedImage = true
}: Props) => {
    const { tabletAndLower } = useBreakpoint();
    return (
        <div
            className={`flex h-full justify-between gap-7 overflow-hidden rounded-xl p-7 ${className} ${tabletAndLower && 'w-full'} ${layout === 'row' ? 'tablet:flex-row tablet:items-center flex-col' : 'flex-col'}`}
        >
            <div>
                <h3 className={`text-title-lg text-neutral-dark4 ${titleClassName}`}>{title}</h3>
                <p className={`text-body-md text-neutral mt-4 ${descriptionClassName}`}>{description}</p>
                {!!btnHref && (
                    <Button href={btnHref} color='neutral-dark4' size='lg' target='_blank' className='mt-9'>
                        {btnText}
                    </Button>
                )}
            </div>
            <div className={`flex h-full w-auto rounded-lg shadow-md ${boxedImage && 'bg-white p-6'}`}>
                <Image
                    src={imageSrc}
                    alt={title}
                    width={1000}
                    height={1000}
                    className={`w-full ${imageClassName}`}
                    loading='lazy'
                />
            </div>
        </div>
    );
};

export default InfoCard;
