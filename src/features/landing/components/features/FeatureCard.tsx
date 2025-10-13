import Image from 'next/image';

//* Types -----------------------------
type Props = {
    title: string;
    imageSrc: string;
    description: string;
    className?: string;
    imageClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    iconContainerClassName?: string;
};

//* Component -------------------------
const FeatureCard = ({
    title,
    imageSrc,
    description,
    className = '',
    imageClassName = '',
    titleClassName = '',
    descriptionClassName = '',
    iconContainerClassName = ''
}: Props) => {
    return (
        <div className={`h-full rounded-xl bg-white p-6 shadow-md ${className}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconContainerClassName}`}>
                <Image
                    src={imageSrc}
                    alt={title}
                    width={20}
                    height={20}
                    loading='lazy'
                    className={`${imageClassName}`}
                />
            </div>
            <h3 className={`text-title-lg text-neutral-dark4 mt-3 ${titleClassName}`}>{title}</h3>
            <p className={`text-body-sm text-neutral mt-5 ${descriptionClassName}`}>{description}</p>
        </div>
    );
};

export default FeatureCard;
