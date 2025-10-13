import { type ReactNode } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';

//* Types -------------------------
type Props = {
    title: string;
    description?: ReactNode;
    motionSrc: string;
    layout?: 'boxed' | 'plain';
    showBtn?: boolean;
    className?: string;
    titleClassName?: string;
    motionClassName?: string;
    descriptionClassName?: string;
    motionContainerClassName?: string;
    contentWrapperClassName?: string;
};

//* Component -------------------------
const ApiOverview = ({
    title,
    description,
    motionSrc,
    layout = 'boxed',
    showBtn = false,
    className = '',
    motionClassName = '',
    titleClassName = '',
    descriptionClassName = '',
    motionContainerClassName = '',
    contentWrapperClassName = ''
}: Props) => {
    const isBoxed = layout === 'boxed';

    return (
        <div className={className}>
            <div
                className={`laptop:flex-row laptop:gap-x-8 desktop:gap-x-16 flex flex-col items-center justify-between gap-16 ${contentWrapperClassName}`}
            >
                <div className='laptop:w-[45%] w-full'>
                    <h2 className={`text-headline-lg text-neutral-dark4 mt-2 ${titleClassName}`}>{title}</h2>
                    {description && (
                        <p className={`text-body-lg text-neutral mt-8 ${descriptionClassName}`}>{description}</p>
                    )}
                    {showBtn && (
                        <Button
                            variant='fill'
                            color='primary'
                            href='/signup'
                            queryParams={{
                                cta_widget: 'api-overview-section'
                            }}
                            className='mt-8'
                        >
                            See Our API in Action
                        </Button>
                    )}
                </div>
                <div
                    className={`laptop:w-[55%] flex w-full flex-col items-center justify-center overflow-hidden ${isBoxed ? 'mobile:px-16 mobile:py-12 to-info-light2 rounded-xl bg-gradient-to-t from-white p-6' : ''} ${motionContainerClassName}`}
                >
                    <div className={`relative h-full ${!isBoxed ? 'laptop:self-end w-auto' : 'w-full'}`}>
                        <Image
                            src={motionSrc}
                            alt='api-overview-image'
                            width={800}
                            height={800}
                            loading='lazy'
                            className={`laptop:mx-0 mx-auto h-auto w-full max-w-[700px] ${motionClassName}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiOverview;
