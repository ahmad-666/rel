import Image from 'next/image';

//* Types -----------------------------
type Props = {
    title: string;
    imgSrc: string;
    index: number;
    className?: string;
    titleClassName?: string;
    bgColorClass?: string;
    textColorClass?: string;
    imgClassName?: string;
};

//* Component -------------------------
const StepCard = ({
    title,
    imgSrc,
    index,
    className = '',
    titleClassName = '',
    bgColorClass = '',
    textColorClass = '',
    imgClassName = ''
}: Props) => {
    return (
        <div
            className={`bg-neutral-light5 relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl px-5 pt-5 ${bgColorClass} ${className}`}
        >
            <div className='flex items-center gap-2'>
                <div className='relative z-10'>
                    <span className={`text-display-sm ${textColorClass}`}></span>
                    <h4 className={`text-title-lg text-neutral-dark4 ${titleClassName}`}>{title}</h4>
                </div>
                <span className='text-display-lg text-neutral-light2 absolute top-0 left-5 z-0'>{index + 1}</span>
            </div>
            <Image
                src={imgSrc}
                alt={title}
                width={600}
                height={400}
                quality={100}
                loading='lazy'
                className={`mt-3 w-full ${imgClassName}`}
            />
        </div>
    );
};

export default StepCard;
